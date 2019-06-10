<template>
  <v-layout row wrap>
    <v-flex xs12 sm5 md5>
      <v-card dark color="primary">
        <v-card-title>상품옵션그룹</v-card-title>
        <v-card-text>
          <v-btn color="success" to="/user/shop/product/option_group/add" nuxt>추가</v-btn>
          <template v-for="(item, index) in opt_group">
            <v-subheader v-if="item.header" :key="item.name">{{ item.name }}</v-subheader>
            <v-list-tile-content :key="item.id">
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.price"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      scrollable
      fullscreen
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    ></v-dialog>
  </v-layout>
</template>
<script>
import draggable from "vuedraggable";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
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
    store
      .dispatch("option_group/get_list", params, { root: true })
      .then(res => {});
  },
  methods: {}
};
</script>
