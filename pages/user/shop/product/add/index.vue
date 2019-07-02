<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-form>
          <v-card class="card--flex-toolbar">
            <v-toolbar card prominent>
              <v-toolbar-title class="body-2 grey--text">
                <v-text-field v-model="form.opt_group.name" label="옵션그룹명" id="id"></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>

            <v-card-text dark color="grey" id="example3Left">
              <draggable
                style="min-height:200px"
                v-model="form.opt_group.option_list"
                :group="{ name: 'shared', pull: 'clone' }"
                @change="chg"
              >
                <template v-for="(element, index) in form.opt_group.option_list">
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
        <v-form>
          <v-card class="card--flex-toolbar">
            <v-toolbar card prominent>
              <v-toolbar-title class="body-2 grey--text">옵션리스트</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <draggable v-model="opt" :group="{ name: 'shared', pull: 'clone' }" :clone="clone">
                <v-list-tile avatar v-for="item in opt" :key="item.id">
                  <v-list-tile-avatar>
                    <v-icon class="handle">drag_handle</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}-{{ item.price }}원</v-list-tile-title>
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
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
import Sortable from "sortablejs";
import { mapState, mapGetters } from "vuex";

export default {
  components: { draggable },
  data() {
    return {
      form: {
        opt_group: {
          name: null,
          option_list: []
        },
        options: []
      },
      editId: 1,
      headers: [
        {
          text: "옵션명",
          align: "left",
          value: "name"
        },
        {
          text: "가격",
          value: "price"
        }
      ],
      default_opt: {
        id: 0,
        name: "",
        price: 0
      },
      editOpts: []
    };
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      opt: state => state.option.list,
      opt_group: state => state.option_group.opt_group
    })
  },
  mounted() {
    // here is the Vue code
    this.init_sortablejs();
  },

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
    init_sortablejs() {
      new Sortable(document.querySelector("#example3Right tbody"), {
        group: {
          name: "shared",
          pull: "clone"
        },

        //handle: ".handle",
        animation: 150
      });
    },
    d_open(item) {
      this.$refs.r_dialog.editItem(item);
    },

    submit() {
      let action = "option_group/add";
      let options = [];
      for (var index in this.$data.form.opt_group.option_list) {
        options.push(this.$data.form.opt_group.option_list[index].id);
      }

      let params = {
        name: this.$data.form.opt_group.name,
        options: options
      };

      console.log(params);
      return this.$store.dispatch(action, params, { root: true }).then(res => {
        alert(res);
      });
    },
    chg: function({ moved, added, removed }) {},
    clone: function(el) {
      let has = false;
      this.form.opt_group.option_list.find(function(element) {
        if (el.id == element.id) {
          has = true;
        }
      });

      if (has == false) {
        return el;
      }
    },
    remove(item) {
      const index = this.form.opt_group.option_list.indexOf(item);
      this.form.opt_group.option_list.splice(index, 1);
    }
  }
};
</script>
