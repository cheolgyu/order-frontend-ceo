<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 grow color="grey">
        <v-form>
          <v-toolbar>
            <v-toolbar-title>{{title.left}}</v-toolbar-title>
          </v-toolbar>
          <v-card dark>
            <v-card-title>
              <v-text-field v-model="edit_form.name" label="이름"></v-text-field>
              <v-text-field
                number
                v-if="type === CONSTANTS.PRODUCT"
                v-model="edit_form.price"
                label="가격"
              ></v-text-field>
            </v-card-title>
          </v-card>

          <v-card dark>
            <v-card-title>{{title.left_down}}</v-card-title>
            <v-card-text dark>
              <v-radio-group column v-model="edit_form.default">
                <draggable
                  style="min-height:200px"
                  v-model="tmp_list"
                  :group="{ name: 'shared', pull: 'clone' }"
                >
                  <template v-for="(element, index) in tmp_list">
                    <v-chip
                      outline
                      color="white"
                      :key="'d_'+index+'_'+element.name"
                      close
                      @input="remove(element)"
                    >
                      <strong>
                        <v-radio :label="element.name" color="info" :value="element.id"></v-radio>
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
              <v-list-tile avatar v-for="item in origin_list" :key="item.id">
                <v-list-tile-avatar>
                  <v-icon class="handle">drag_handle</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.created_at }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
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
  form: {
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
      edit_form: props.form,
      origin_list: [],
      tmp_list: [],
      dispatch_action: null,
      params: null
    };
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
          this.edit_form = this.form;
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
              this.edit_form.id = tmp.id;
              this.edit_form.name = tmp.name;
              this.edit_form.price = tmp.price;
              this.tmp_list = tmp.option_group_list;
              break;
            case CONSTANTS.OPTION_GROUP:
              this.origin_list = this.opt;
              this.dispatch_action = "option_group/update";
              let tmp2 = this.init_find(this.opt_group);
              this.edit_form.id = tmp2.id;
              this.edit_form.name = tmp2.name;
              this.edit_form.default = tmp2.default;
              console.log(tmp2);
              console.log(this.edit_form);
              this.tmp_list = tmp2.option_list;
              break;
          }
          break;
      }
    },
    init_find(items) {
      return items.find(function(el) {
        if (el.id == window.$nuxt._route.params.id)
          //  return JSON.parse(JSON.stringify(el));
          // return Object.assign({}, el);
          return { ...el };
      });
    },
    submit() {
      this.submit_before();

      return this.$store
        .dispatch(this.dispatch_action, this.edit_form, { root: true })
        .then(res => {
          console.log(res);
          if (res.status == 201) {
          }
        });
    },
    clone: function(el) {
      let has = false;
      this.tmp_list.find(function(element) {
        if (el.id == element.id) {
          has = true;
        }
      });
      if (has == false) {
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
          this.edit_form.opt_group = arr;
          break;
        case CONSTANTS.OPTION_GROUP:
          this.edit_form.options = arr;
          break;
        case CONSTANTS.OPTION:
          break;
        default:
          break;
      }
    }
  }
};
</script>
