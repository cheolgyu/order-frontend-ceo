<template>
  <v-layout row wrap>
    <v-flex xs12 sm5 md5>
      <v-card dark color="primary">
        <v-card-title>상품옵션그룹</v-card-title>
        <v-card-text>
          {{opt_group}}/{{opt}}/ {{auth}}
          <template v-for="(item, index) in opt">
            <v-subheader v-if="item.header" :key="item.name">{{ item.name }}</v-subheader>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.price"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-card-text>
      </v-card>
      <v-card dark color="primary">
        <v-card-title>상품옵션</v-card-title>
        <v-card-text></v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import draggable from "vuedraggable";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      opt: state => state.option_group.opt,
      opt_group: state => state.option_group.opt_group
    })
  },

  fetch({ store, params }) {},
  methods: {}
};
</script>
