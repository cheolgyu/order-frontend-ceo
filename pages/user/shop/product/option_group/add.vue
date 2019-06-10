<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm5 md3>
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
      <v-flex xs12 sm5 md3>
        <v-card dark color="grey">
          <v-card-title>상품옵션그룹</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers.opt_group"
              :items="opt_group"
              item-key="name"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <tr @click="editItem('opt_group',props.item)">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 md3>
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
      <v-flex xs12 sm5 md3>
        <v-card dark color="grey">
          <v-card-title>상품옵션</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers.opt"
              :items="opt"
              item-key="name"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <tr @click="editItem('opt',props.item)">
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
import draggable from "vuedraggable";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        opt_group: {
          id: null,
          name: null
        },
        opt: {
          id: null,
          name: null,
          price: null
        }
      },

      headers: {
        opt_group: [
          {
            text: "ID",
            align: "left",
            value: "id"
          },
          {
            text: "이름",
            align: "left",
            value: "name"
          }
        ],
        opt: [
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

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
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
      } else if (t == "opt") {
        this.$data.form.opt.id = null;
        this.$data.form.opt.name = null;
        this.$data.form.opt.price = null;
      }
    }
  }
};
</script>
