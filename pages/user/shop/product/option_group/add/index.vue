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
              <v-btn icon @click="addRow">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>

            <v-card-text dark color="grey" style="height:200px" id="example3Left"></v-card-text>
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
              <v-btn icon @click="addRow">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-data-table
                :headers="headers.opt"
                :items="opt"
                item-key="name"
                id="example3Right"
                hide-actions
              >
                <template v-slot:items="props">
                  <tr>
                    <td class="px-1" style="width: 0.1%">
                      <v-btn style="cursor: move" icon class="handle">
                        <v-icon>drag_handle</v-icon>
                      </v-btn>
                    </td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.price }}</td>
                    <td>
                      <v-btn
                        dark
                        icon
                        :to="{ path: '/user/shop/product/option_group/option/update/'+props.item.id }"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn dark icon @click="d_open(props.item)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
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
  components: {},
  data() {
    return {
      form: {
        opt_group: {
          name: null,
          option_list: []
        }
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
      new Sortable(document.querySelector("#example3Left"), {
        group: {
          name: "shared",
          pull: "clone" // To clone: set pull to 'clone'
        },
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex);
           const rowSelected = _self.desserts.splice(oldIndex, 1)[0]; // Get the selected row and remove it
          _self.desserts.splice(newIndex, 0, rowSelected); // Move it to the new index
        },
        animation: 150
      });

      new Sortable(document.querySelector("#example3Right tbody"), {
        group: {
          name: "shared",
          pull: "clone"
        },
        //handle: ".handle",
        animation: 150
      });
    },
    addRow() {
      this.default_opt.id = this.editId;
      this.editId++;
      this.form.opt_group.option_list.push(Object.assign({}, this.default_opt));
    },
    removeRow(item) {
      const index = this.form.opt_group.option_list.indexOf(item);
      this.form.opt_group.option_list.splice(index, 1);
    },
    d_open(item) {
      this.$refs.r_dialog.editItem(item);
    },

    submit(t) {
      let action = "option_group/add";
      let params = this.$data.form.opt_group;
      if (t == "opt") {
        action = "option/add";
        params = this.$data.form.opt;
      }
      params.id = null;
      console.log(params);
      //return this.$store.dispatch(action, params, { root: true }).then(res => {
      //   alert(res);
      //});
    }
  }
};
</script>
