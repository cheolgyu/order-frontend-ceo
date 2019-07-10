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
              <v-text-field v-model="edit_form.name" label="이름" id="id"></v-text-field>
              <v-text-field v-if="type === CONSTANTS.PRODUCT" v-model="edit_form.price" label="가격"></v-text-field>
            </v-card-title>
          </v-card>
          <v-card dark>
            <v-card-title>{{title.left_down}}</v-card-title>
            <v-card-text dark>
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
                    <strong>{{ element.name }}</strong>
                  </v-chip>
                </template>
              </draggable>
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
import { mapState, mapGetters } from "vuex";
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
    this.ifupdate();
    this.tb_switch();
  },
  methods: {
    ifupdate() {
      if (this.action == CONSTANTS.UPDATE) {
        let id = this.$route.params.id;
        let items = null;
        if (this.type == CONSTANTS.PRODUCT) {
          items = this.products;
        } else if (this.type == CONSTANTS.OPTION_GROUP) {
          items = this.opt_group;
        }
        let edit = items.find(function(el) {
          if (el.id == id) return el;
        });
        this.edit_form = JSON.parse(JSON.stringify(edit)); //Object.assign({}, edit);
      }
    },
    submit() {
      this.submit_before();

      return this.$store
        .dispatch(this.dispatch_action, this.edit_form, { root: true })
        .then(res => {
          alert(res);
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
    },
    tb_switch() {
      switch (this.type) {
        case CONSTANTS.PRODUCT:
          this.origin_list = this.opt_group;
          this.tmp_list = this.edit_form.option_group_list;
          this.dispatch_action =
            this.action === CONSTANTS.ADD ? "product/add" : "product/update";

          break;
        case CONSTANTS.OPTION_GROUP:
          this.origin_list = this.opt;
          this.tmp_list = this.edit_form.option_list;
          this.dispatch_action =
            this.action === CONSTANTS.ADD
              ? "option_group/add"
              : "option_group/update";

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
