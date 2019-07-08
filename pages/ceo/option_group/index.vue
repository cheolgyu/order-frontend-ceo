<template>
  <v-container fluid>
    <v-flex xs12 grow pa-1>
      <v-toolbar>
        <v-toolbar-title>상품옵션그룹</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" to="/user/shop/product/option_group/add">New Item</v-btn>
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
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.options }}</td>
                <td>
                  <ul>
                    <li v-for="opt in props.item.option_list" :key="opt.id">{{ opt.name }}</li>
                  </ul>
                </td>
                <td>
                  <v-btn
                    dark
                    icon
                    :to="{ path: '/user/shop/product/option_group/update/'+props.item.id }"
                  >
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
import draggable from "vuedraggable";
import { mapState, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      list: [],
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
      opt_group: state => state.option_group.list
    })
  },
  mounted() {},

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
    remove(item) {
      if (confirm("정말 삭제하시겠습니까?")) {
        let params = {
          id: item.id
        };
        this.$store.dispatch("option_group/delete", params, { root: true });
      }
    }
  }
};
</script>
