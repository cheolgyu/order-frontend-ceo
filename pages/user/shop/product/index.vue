<template>
  <v-container fluid>
    <v-flex xs12 grow pa-1>
      <v-toolbar>
        <v-toolbar-title>상품</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" to="/user/shop/product/add">New Item</v-btn>
      </v-toolbar>
      <v-card dark color="grey">
        <v-card-text>
          <v-data-table
            :headers="headers.opt_group"
            :items="products"
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
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.options }}</td>
                <td>
                  <ul>
                    <li v-for="opt in props.item.option_list" :key="opt.id">{{ opt.name }}</li>
                  </ul>
                </td>
                <td>
                  <v-btn dark icon :to="{ path: '/user/shop/product/update/'+props.item.id }">
                    <v-icon small class="mr-2">edit</v-icon>
                  </v-btn>
                  <v-btn dark icon @click="remove(props.item)">
                    <v-icon small class="mr-2">delete</v-icon>
                  </v-btn>
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
            text: "이름",
            align: "left",
            value: "name"
          },
          {
            text: "옵션들",
            value: "options",
            sortable: false
          },
          {
            text: "",
            value: "options",
            sortable: false
          },
          {
            text: "",
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
      opt_group: state => state.option_group.opt_group,
      products: state => state.product.list
    })
  },
  mounted() {
    // here is the Vue code
    this.start_sort();
  },

  fetch({ store, params }) {
    store.dispatch("product/get", params, { root: true });
    store.dispatch("option_group/get_list", params, { root: true });
  },

  methods: {
    remove(item) {
      console.log(item);
      if (confirm("정말 삭제하시겠습니까?")) {
        let params = {
          id: item.id
        };
        console.log(params);
        this.$store.dispatch("option_group/delete", params, { root: true });
      }
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
