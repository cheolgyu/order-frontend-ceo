<template>
  <v-container grid-list-md text-xs-center>
    <v-form>
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent>
          <v-toolbar-title class="body-2 grey--text">옵션명</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text dark color="grey" id="tb">
          <v-layout row wrap>
            <v-flex xs3>
              <v-text-field label="옵션명" required v-model="form.opt.name"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field label="가격" required v-model="form.opt.price"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-btn color="success" @click="submit()">ok</v-btn>
    </v-form>
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
          price: 0
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
      opt_group: state => state.option_group.opt_group
    })
  },
  mounted() {
    let id = this.$route.params.id;
    let edit = this.opt.find(function(el) {
      if (el.id == id) return el;
    });

    this.$data.form.opt = edit;
  },

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
    submit(t) {
      let action = "option/update";
      let params = this.$data.form.opt;
      return this.$store.dispatch(action, params, { root: true }).then(res => {
        console.log("11111111111111111111");
        if (res.data.status == 201) {
          alert("수정됬습니다.");
          this.$nuxt.$router.replace({
            path: "/user/shop/product/option_group/option"
          });
        }
      });
    }
  }
};
</script>
