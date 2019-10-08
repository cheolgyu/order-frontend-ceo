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
                  v-model="tmp_list"
                  :group="{ name: 'shared', pull: 'clone' }"
                >
                  <template v-for="(optg, index) in tmp_list">
                    <v-chip
                      outlined
                      color="white"
                      :key="'d_'+index+'_'+optg.og_nm"
                      close
                      @click:close="remove(optg)"
                    >
                      <strong>
                        <v-radio
                          :label="optg.og_nm+'('+get_opt_default_price(optg)+'원)'"
                          color="info"
                          :value="optg.og_id"
                        ></v-radio>
                      </strong>
                    </v-chip>
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
              v-model="origin_list"
              :group="{ name: 'shared', pull: 'clone' }"
              :clone="clone"
            >
              <v-list-item v-for="item in origin_list" :key="item.og_id">
                <v-list-item-avatar>
                  <v-icon class="handle">drag_handle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.og_nm }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip
                    bottom
                    :open-on-click="true"
                    :open-on-hover="true"
                    :offset-overflow="true"
                    :allow-overflow="true"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                    </template>

                    <p
                      v-for="opt in item.o"
                      :key="opt.o_id"
                      v-bind:class="item.og_default== opt.o_id? 'info--text font-weight-bold' : ''"
                    >{{ opt.og_nm}}( {{ opt.o_price}} 원 )</p>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
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
  components: { draggable },
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
      origin_list: [],
      tmp_list: [],
      dispatch_action: null,
      params: null
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
              this.origin_list = this.opt_group;
              this.dispatch_action = "product/add";
              break;
            case CONSTANTS.OPTION_GROUP:
              this.origin_list = this.opt;
              this.dispatch_action = "option_group/add";
              break;
          }
          break;

        case CONSTANTS.UPDATE:
          switch (this.type) {
            case CONSTANTS.PRODUCT:
              this.origin_list = this.opt_group;
              this.dispatch_action = "product/update";
              let tmp = this.init_find(this.products);
              this.edit_form[this.type].id = tmp.p_id;
              this.edit_form[this.type].name = tmp.p_nm;
              this.edit_form[this.type].price = tmp.price;
              this.edit_form[this.type].p_price = tmp.p_price;
              this.edit_form[this.type].optg_price = tmp.optg_price;
              this.tmp_list = tmp.og;

              break;
            case CONSTANTS.OPTION_GROUP:
              this.origin_list = this.opt;
              this.dispatch_action = "option_group/update";
              let tmp2 = this.init_find(this.opt_group);
              this.edit_form[this.type].id = tmp2.id;
              this.edit_form[this.type].name = tmp2.name;
              this.edit_form[this.type].default = tmp2.default;
              this.edit_form[this.type].p_price = tmp2.p_price;
              this.edit_form[this.type].optg_price = tmp2.optg_price;
              this.tmp_list = tmp2.option_list;
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
          return el.id == window.$nuxt._route.params.id;
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
      console.log("clone", this.tmp_list, el);
      if (this.type == "product") {
        this.tmp_list.find(function(element) {
          if (el.og_id == element.og_id) {
            has = true;
          }
        });
      } else {
        this.tmp_list.find(function(element) {
          if (el.og_id == element.og_id) {
            has = true;
          }
        });
      }

      if (has == false) {
        this.edit_form[this.type].optg_price =
          Number(this.edit_form[this.type].optg_price) +
          Number(this.get_opt_default_price(el));
        return el;
      }
    },
    remove(item) {
      this.tmp_list.splice(this.tmp_list.indexOf(item), 1);
    },
    submit_before() {
      let arr = [];
      for (var i = 0; i < this.tmp_list.length; i++) {
        arr.push(this.tmp_list[i].id);
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
    get_opt_default_price(optg) {
      console.log("get_opt_default_price", optg);
      if (optg.hasOwnProperty("o")) {
        let aa = optg.o.find(el => el.o_id == optg.og_default);
        console.log(aa);
        return optg.o.find(el => el.o_id == optg.og_default).o_price;
      } else {
        return optg.option_list.find(el => el.id == optg.default).price;
      }
    },
    set_price() {
      this.edit_form[this.type].price =
        Number(this.edit_form[this.type].p_price) +
        Number(this.edit_form[this.type].optg_price);
    }
  }
};
</script>
<style scoped>
.is_defualt {
  color: red;
}
</style>
