<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 grow color="grey">
        <v-form>
          <v-toolbar>
            <v-toolbar-title>{{title.left}}{{edit_form[type].name}}</v-toolbar-title>
          </v-toolbar>
          <v-card dark>
            <v-card-title>
              <v-text-field v-model="edit_form[type].name" label="이름"></v-text-field>
              <v-text-field
                number
                v-if="type === CONSTANTS.PRODUCT"
                v-model="edit_form[type].p_price"
                label="상품의 기본가격"
              ></v-text-field>
              <v-text-field
                number
                v-if="type === CONSTANTS.PRODUCT"
                v-model="edit_form[type].optg_price"
                disabled
                label="+옵션그룹 기본가격"
              ></v-text-field>
              <v-text-field
                number
                v-if="type === CONSTANTS.PRODUCT"
                v-model="edit_form[type].price"
                disabled
                label="=소비자 기본가격"
              ></v-text-field>
            </v-card-title>
          </v-card>

          <v-card dark>
            <v-card-title>{{title.left_down}}</v-card-title>
            <v-card-text dark>
              <v-radio-group column>
                <draggable
                  style="min-height:200px"
                  v-model="edit_list"
                  :group="{ name: 'shared', pull: 'clone' }"
                >
                  <template v-if="type === CONSTANTS.PRODUCT">
                    <template v-for="edit in edit_list">
                      <editItemP
                        :item="edit"
                        v-bind:key="edit.og_id"
                        :label="get_label(edit)"
                        :event="event"
                      />
                    </template>
                  </template>

                  <template v-else-if="type === CONSTANTS.OPTION_GROUP">
                    <template v-for="(edit) in edit_list">
                      <editItemOg
                        :item="edit"
                        v-bind:key="edit.o_id"
                        :label="get_label(edit)"
                        :event="event"
                      />
                    </template>
                  </template>
                </draggable>
              </v-radio-group>
            </v-card-text>
          </v-card>
          <v-btn color="success" @click="submit">ok</v-btn>
        </v-form>
      </v-flex>
      <v-flex xs6>
        <v-toolbar>
          <v-toolbar-title>{{title.right}}</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <draggable
              v-model="share_list"
              :group="{ name: 'shared', pull: 'clone' }"
              :clone="clone"
            >
              <template v-if="type === CONSTANTS.PRODUCT">
                <template v-for="item in share_list">
                  <shareItemP
                    :item="item"
                    v-bind:key="item.og_id"
                    :label="get_label(item)"
                    :event="event"
                  />
                </template>
              </template>

              <template v-else-if="type === CONSTANTS.OPTION_GROUP">
                <template v-for="item in share_list">
                  <shareItemOg :item="item" v-bind:key="item.o_id" :label="get_label(item)" />
                </template>
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
import CONSTANTS from "~/components/constants.vue";
import editItemP from "~/components/contents/add/draggable/edit/item/p.vue";
import editItemOg from "~/components/contents/add/draggable/edit/item/og.vue";
import shareItemP from "~/components/contents/add/draggable/share/item/p.vue";
import shareItemOg from "~/components/contents/add/draggable/share/item/og.vue";

const props = {
  title: {
    type: Object,
    default: () => ({})
  },
  type: {
    required: true,
    type: String
  },
  action: {
    required: true,
    type: String
  }
};
export default {
  props,
  components: { draggable, editItemP, editItemOg, shareItemP, shareItemOg },
  data() {
    return {
      CONSTANTS: CONSTANTS,
      edit_form: {
        product: {
          id: null,
          name: null,
          price: 0,
          p_price: 0,
          optg_price: 0,
          opt_group: []
        },
        option_group: {
          name: null,
          price: 0,
          p_price: 0,
          optg_price: 0,
          default: null,
          options: []
        }
      },
      share_list: [],
      edit_list: [],
      dispatch_action: null,
      params: null,
      event: {
        remove: this.remove,
        get_label: this.get_label
      }
    };
  },
  watch: {
    "edit_form.product.p_price": "set_price",
    "edit_form.product.optg_price": "set_price"
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      opt: state => state.option.list,
      opt_group: state => state.option_group.list,
      products: state => state.product.list
    })
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      switch (this.action) {
        case CONSTANTS.ADD:
          this.edit_form[this.type] = this.form;
          this.edit_form[this.type].optg_price = 0;
          this.edit_form[this.type].p_price = 0;
          switch (this.type) {
            case CONSTANTS.PRODUCT:
              this.share_list = this.opt_group;
              this.dispatch_action = "product/add";
              break;
            case CONSTANTS.OPTION_GROUP:
              this.share_list = this.opt;
              this.dispatch_action = "option_group/add";
              break;
          }
          break;

        case CONSTANTS.UPDATE:
          switch (this.type) {
            case CONSTANTS.PRODUCT:
              this.share_list = this.opt_group;
              this.dispatch_action = "product/update";
              let tmp = this.init_find(this.products);
              this.edit_form[this.type].id = tmp.p_id;
              this.edit_form[this.type].name = tmp.p_nm;
              this.edit_form[this.type].price = tmp.price;
              this.edit_form[this.type].p_price = tmp.p_price;
              this.edit_form[this.type].optg_price = tmp.optg_price;
              this.edit_list = tmp.og;

              break;
            case CONSTANTS.OPTION_GROUP:
              this.share_list = this.opt;
              this.dispatch_action = "option_group/update";
              let tmp2 = this.init_find(this.opt_group);
              this.edit_form[this.type].id = tmp2.og_id;
              this.edit_form[this.type].name = tmp2.og_nm;
              this.edit_form[this.type].default = tmp2.og_default;
              this.edit_form[this.type].p_price = 0;
              this.edit_form[this.type].optg_price = 0;
              this.edit_list = tmp2.o;
              break;
          }
          break;
      }
    },
    init_find(items) {
      return items.find(function(el) {
        if (el.hasOwnProperty("p_id")) {
          return el.p_id == window.$nuxt._route.params.id;
        } else {
          return el.og_id == window.$nuxt._route.params.id;
        }
      });
    },
    submit() {
      this.submit_before();

      return this.$store
        .dispatch(this.dispatch_action, this.edit_form[this.type], {
          root: true
        })
        .then(res => {});
    },
    clone: function(el) {
      let has = false;
      if (this.type == "product") {
        this.edit_list.find(function(element) {
          if (el.og_id == element.og_id) {
            has = true;
          }
        });
      } else {
        this.edit_list.find(function(element) {
          if (el.og_id == element.og_id) {
            has = true;
          }
        });
      }

      if (has == false) {
        this.edit_form[this.type].optg_price =
          Number(this.edit_form[this.type].optg_price) +
          Number(this.get_price(el));
        return el;
      }
    },
    remove(item) {
      this.edit_list.splice(this.edit_list.indexOf(item), 1);
    },
    submit_before() {
      let arr = [];
      for (var i = 0; i < this.edit_list.length; i++) {
        arr.push(this.edit_list[i].id);
      }

      switch (this.type) {
        case CONSTANTS.PRODUCT:
          this.edit_form[this.type].opt_group = arr;
          break;
        case CONSTANTS.OPTION_GROUP:
          this.edit_form[this.type].options = arr;
          break;
        case CONSTANTS.OPTION:
          break;
        default:
          break;
      }
    },
    get_price(item) {
      if (item.hasOwnProperty("og_id")) {
        return item.o.find(el => el.o_id == item.og_default).o_price;
      } else {
        return item.o_price;
      }
    },
    set_price() {
      this.edit_form[this.type].price =
        Number(this.edit_form[this.type].p_price) +
        Number(this.edit_form[this.type].optg_price);
    },
    get_label(item) {
      let text = "";
      if (item.hasOwnProperty("og_id")) {
        text = item.og_nm + "(" + this.get_price(item) + "원)";
      } else {
        text = item.o_nm + "(" + this.get_price(item) + "원)";
      }
      return text;
    }
  }
};
</script>
<style scoped>
.is_defualt {
  color: red;
}
</style>
