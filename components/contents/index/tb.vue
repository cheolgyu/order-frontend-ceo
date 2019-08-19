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
          <v-data-table
            v-if="type === CONSTANTS.PRODUCT"
            :headers="headers"
            :items="products"
            hide-default-footer
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr v-for="item in items" :key="item.name">
                  <td class="px-1" style="width: 0.1%">
                    <v-btn style="cursor: move" icon class="handle">
                      <v-icon>drag_handle</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <ul>
                      <li
                        v-for="option_group in item.option_group_list"
                        :key="option_group.id"
                      >{{ option_group.name }}</li>
                    </ul>
                  </td>
                  <td>
                    <v-btn dark icon :to="{ path: ''+btn.to.update+''+item.id+'' }">
                      <v-icon small class="mr-2">edit</v-icon>
                    </v-btn>
                    <v-btn dark icon @click="remove(item)">
                      <v-icon small class="mr-2">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <v-data-table
            v-else-if="type === CONSTANTS.OPTION_GROUP"
            :headers="headers"
            :items="opt_group"
            item-key="name"
            hide-default-footer
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr v-for="item in items" :key="item.name">
                  <td class="px-1" style="width: 0.1%">
                    <v-btn style="cursor: move" icon class="handle">
                      <v-icon>drag_handle</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.options }}</td>
                  <td>
                    <ul>
                      <li v-for="opt in item.option_list" :key="opt.id">
                        <template v-if="item.default == opt.id">
                          <strong color="info">
                            <ins>{{ opt.name }}</ins>
                          </strong>
                        </template>
                        <template v-else>{{ opt.name }}</template>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <v-btn dark icon :to="{ path: ''+btn.to.update+item.id }">
                      <v-icon small class="mr-2">edit</v-icon>
                    </v-btn>
                    <v-btn dark icon @click="remove(item)">
                      <v-icon small class="mr-2">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <v-data-table
            v-else-if="type === CONSTANTS.OPTION"
            :headers="headers"
            :items="opt"
            item-key="name"
            hide-default-footer
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr v-for="item in items" :key="item.name">
                  <td class="px-1" style="width: 0.1%"></td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <v-btn dark icon :to="{ path: btn.to.update+item.id }">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn dark icon @click="remove(item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
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
  type: {
    required: true,
    type: String
  }
};
export default {
  props,
  data() {
    return {
      CONSTANTS: CONSTANTS,
      items: [],
      btn: {
        to: {
          new: "",
          update: "",
          delete: ""
        }
      }
    };
  },
  computed: {
    ...mapState({
      opt: state => state.option.list,
      opt_group: state => state.option_group.list,
      products: state => state.product.list
    }),
    test() {}
  },
  mounted() {
    this.init();
  },

  methods: {
    remove(item) {
      if (confirm("정말 삭제하시겠습니까?")) {
        let params = {
          id: item.id
        };
        this.$store.dispatch(this.btn.to.delete, params, { root: true });
      }
    },
    init() {
      switch (this.type) {
        case CONSTANTS.PRODUCT:
          this.btn.to.new = "/ceo/product/add";
          this.btn.to.update = "/ceo/product/";
          this.btn.to.delete = "product/delete";
          break;
        case CONSTANTS.OPTION_GROUP:
          this.btn.to.new = "/ceo/option_group/add";
          this.btn.to.update = "/ceo/option_group/";
          this.btn.to.delete = "option_group/delete";
          break;
        case CONSTANTS.OPTION:
          this.btn.to.new = "/ceo/option/add";
          this.btn.to.update = "/ceo/option/";
          this.btn.to.delete = "option/delete";
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