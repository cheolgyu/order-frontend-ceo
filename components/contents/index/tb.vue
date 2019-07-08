<template>
  <v-container fluid>
    <v-flex xs12 grow pa-1>
      <v-toolbar>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" :to="btn.to.new">New Item</v-btn>
      </v-toolbar>
      <v-card dark color="grey">
        <v-card-text>
          <v-data-table :headers="headers" :items="items" item-key="name" hide-actions>
            <template v-if="tb_items === CONSTANTS.PRODUCT" v-slot:items="props">
              <tr>
                <td class="px-1" style="width: 0.1%">
                  <v-btn style="cursor: move" icon class="handle">
                    <v-icon>drag_handle</v-icon>
                  </v-btn>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.price }}</td>
                <td>
                  <ul>
                    <li
                      v-for="opt_group in props.item.option_group_list"
                      :key="opt_group.id"
                    >{{ opt_group.name }}</li>
                  </ul>
                </td>
                <td>
                  <v-btn dark icon :to="{ path: btn.to.update+props.item.id }">
                    <v-icon small class="mr-2">edit</v-icon>
                  </v-btn>
                  <v-btn dark icon @click="remove(props.item)">
                    <v-icon small class="mr-2">delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-else-if="tb_items === CONSTANTS.OPTION_GROUP" v-slot:items="props">
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
            <template v-else-if="tb_items === CONSTANTS.OPTION" v-slot:items="props">
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
                  <v-btn dark icon @click="remove(props.item)">
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
import draggable from "vuedraggable";
import { mapState, mapGetters } from "vuex";
import CONSTANTS from "~/components/constants.vue";

const props = {
  name: "tb",
  headers: {
    required: true
  },
  title: {
    required: true,
    type: String
  },
  tb_items: {
    required: true,
    type: String
  },
  form: { required: true }
};
export default {
  props,
  data() {
    return {
      items: [],
      btn: {
        to: {
          new: null,
          update: null,
          delete: null
        }
      }
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
    }),
    test() {
      console.log("this", this);
    }
  },
  mounted() {
    this.tb_switch();
  },

  fetch({ store, params }) {
    store.dispatch("product/get", params, { root: true });
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
    },
    tb_switch() {
      console.log(this.tb_items, CONSTANTS.PRODUCT);
      switch (this.tb_items) {
        case CONSTANTS.PRODUCT:
          console.log(this.tb_items, CONSTANTS.PRODUCT);
          this.items = this.products;
          this.btn.to.new = "/ceo/product/add";
          this.btn.to.update = "/ceo/product/";
          break;
        case CONSTANTS.OPTION_GROUP:
          this.items = this.option_groups;
          this.btn.to.new = "/ceo/option_group/add";
          this.btn.to.update = "/ceo/option_group/";
          break;
        case CONSTANTS.OPTION:
          this.items = this.option_groups;
          this.btn.to.new = "/ceo/option_group/add";
          this.btn.to.update = "/ceo/option_group/";
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
</style>