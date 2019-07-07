<template>
  <v-container fluid>
    <v-flex xs12 grow pa-1>
      <v-toolbar>
        <v-toolbar-title>상품옵션</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          to="/user/shop/product/option_group/option/add"
        >New Item</v-btn>
      </v-toolbar>

      <v-card dark color="grey">
        <v-card-text>
          <v-data-table
            :headers="headers.opt"
            :items="opt"
            item-key="name"
            class="elevation-1 tb-option_group"
            hide-actions
          >
            <template v-slot:items="props">
              <tr>
                <td class="px-1" style="width: 0.1%"></td>
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
    </v-flex>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      form: {
        opt: {
          id: null,
          name: null,
          price: null
        }
      },
      headers: {
        opt: [
          {
            sortable: false
          },
          {
            text: "이름",
            align: "left",
            value: "name"
          },

          {
            text: "가격",
            //align: "right",
            value: "price"
          },
          {
            text: "관리",
            sortable: false
          }
        ]
      }
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
    d_open(item) {
      to = "/user/shop/product/option_group/option/add";
    }
  }
};
</script>
