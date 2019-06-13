<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 shrink pa-1>
        <v-card dark color="grey">
          <v-card-title>상품옵션그룹</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="form.opt_group.name" label="옵션그룹 이름"></v-text-field>
              <v-btn color="primary" @click="reset('opt_group')">Reset</v-btn>
              <v-btn
                v-if="form.opt_group.id == null"
                color="success"
                @click="submit('opt_group')"
              >추가</v-btn>
              <v-btn
                v-if="form.opt_group.id != null"
                color="info"
                @click="submit_update('opt_group')"
              >수정</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 shrink pa-1>
        <v-card dark color="grey">
          <v-card-title>상품옵션</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="form.opt.name" label="옵션 이름"></v-text-field>
              <v-text-field v-model="form.opt.price" label="옵션 가격"></v-text-field>
              <v-btn color="primary" @click="reset('opt')">Reset</v-btn>
              <v-btn v-if="form.opt.id == null" color="success" @click="submit('opt')">추가</v-btn>
              <v-btn v-if="form.opt.id != null" color="info" @click="submit_update('opt')">수정</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 grow pa-1>
        <v-toolbar>
          <v-toolbar-title>상품옵션그룹</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <opt-group-dialog ref="r_dialog"></opt-group-dialog>
        </v-toolbar>

        <v-card dark color="grey">
          <v-card-text>
            <v-data-table
              :headers="headers.opt_group"
              :items="opt_group"
              item-key="name"
              :expand="expand"
              class="elevation-1 tb-option_group"
              hide-actions
            >
              <template v-slot:items="props">
                <tr>
                  <td class="px-1" style="width: 0.1%">
                    <v-btn style="cursor: move" icon class="handle">
                      <v-icon>drag_handle</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.options }}</td>
                  <td>
                    <v-icon small class="mr-2" @click="d_open(props.item)">edit</v-icon>
                    <v-icon small @click="d_open(props.item)">delete</v-icon>
                  </td>
                </tr>
              </template>
              <template v-slot:expand="props">
                <v-card flat>
                  <v-card-text>
                    <div class="group_option_list">
                      <div v-for="element in list" :key="element.name">
                        <div>{{ element.name }}</div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 grow pa-1>
        <v-card dark color="grey">
          <v-card-title>상품옵션</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers.opt"
              :items="opt"
              item-key="name"
              class="elevation-1 tb-option"
              hide-actions
            >
              <template v-slot:items="props">
                <tr @click="editItem('opt',props.item)">
                  <td class="px-1" style="width: 0.1%">
                    <v-btn style="cursor: move" icon class="handle">
                      <v-icon>drag_handle</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.price }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import OptGroupDialog from "~/components/OptGroupDialog.vue";
import draggable from "vuedraggable";
import Sortable from "sortablejs";
import { mapState, mapGetters } from "vuex";

function tbsort(sel, group_nm, clone) {
  let table = document.querySelector(sel);
  const _self = this;
  Sortable.create(table, {
    group: group_nm,
    multiDrag: true,
    clone: clone,
    handle: ".handle", // Use handle so user can select text
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex);
      // const rowSelected = _self.desserts.splice(oldIndex, 1)[0]; // Get the selected row and remove it
      //_self.desserts.splice(newIndex, 0, rowSelected); // Move it to the new index
    }
  });
  return _self;
}

export default {
  components: {
    OptGroupDialog
  },
  data() {
    return {
      list: [
        { name: "11" },
        { name: "12" },
        { name: "13" },
        { name: "14" },
        { name: "15" }
      ],
      form: {
        opt_group: {
          id: null,
          name: null,
          options: []
        },
        opt: {
          id: null,
          name: null,
          price: null
        }
      },
      expand: false,
      headers: {
        opt_group: [
          {
            sortable: false
          },
          {
            text: "ID",
            align: "left",
            value: "id"
          },
          {
            text: "이름",
            align: "left",
            value: "name"
          },
          {
            text: "옵션들",
            value: "options",
            sortable: false
          }
        ],
        opt: [
          {
            sortable: false
          },
          {
            text: "이름",
            align: "left",
            value: "name"
          },
          { text: "가격", value: "price" }
        ]
      },

      dialog: false
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
    this.start_sort();
  },

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
    d_open(item) {
      this.$refs.r_dialog.editItem(item);
    },
    start_sort() {
      //let t1 = tbsort(".tb-option_group tbody", "tb-option_group", false);
      //let t2 = tbsort(".tb-option tbody", "group_options", true);
      //let t3 = tbsort(".group_option_list", "group_options", false);
    },
    submit(t) {
      let action = "option_group/add";
      let params = this.$data.form.opt_group;
      if (t == "opt") {
        action = "option/add";
        params = this.$data.form.opt;
      }
      params.id = null;
      return this.$store.dispatch(action, params, { root: true }).then(res => {
        alert(res);
      });
    },
    submit_update(t) {
      let action = "option_group/update";
      let params = this.$data.form.opt_group;
      if (t == "opt") {
        action = "option/update";
        params = this.$data.form.opt;
      }
      return this.$store.dispatch(action, params, { root: true }).then(res => {
        alert(res);
      });
    },
    editItem(t, item) {
      let params = this.$data.form.opt_group;
      if (t == "opt_group") {
        this.$data.form.opt_group.id = item.id;
        this.$data.form.opt_group.name = item.name;
        this.$data.form.opt_group.options = item.options;
      } else if (t == "opt") {
        this.$data.form.opt.id = item.id;
        this.$data.form.opt.name = item.name;
        this.$data.form.opt.price = item.price;
      }
    },
    reset(t) {
      if (t == "opt_group") {
        this.$data.form.opt_group.id = null;
        this.$data.form.opt_group.name = null;
        this.$data.form.opt_group.options = [];
      } else if (t == "opt") {
        this.$data.form.opt.id = null;
        this.$data.form.opt.name = null;
        this.$data.form.opt.price = null;
      }
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
