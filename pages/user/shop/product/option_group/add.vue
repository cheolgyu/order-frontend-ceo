<template>
  <v-container grid-list-md text-xs-center>
    <v-form>
      <v-text-field v-model="form.opt_group.name" label="옵션그룹명" id="id"></v-text-field>
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent>
          <v-toolbar-title class="body-2 grey--text">상품옵션</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addRow">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text dark color="grey" id="tb">
          <v-layout row wrap v-for=" (item,index) in form.opt_group.option_list" :key="item.id">
            <v-flex xs3>
              <v-text-field label="옵션명" required :value="item.name"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field label="가격" required :value="item.price"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn flat icon color="red" @click="removeRow(item)">
                <v-icon>remove</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-btn color="success" @click="submit">ok</v-btn>
    </v-form>
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
  },

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
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
