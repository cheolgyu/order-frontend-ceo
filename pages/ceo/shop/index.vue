<template>
  <v-list>
    <v-list-item-group color="primary">
      <v-list-item v-for="(item, i) in order.list" :key="i">
        <v-list-item-content>
          <v-list-item-title v-html="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: scope => ({}),
  fetch({ store, params }) {
    console.log("=====================shop.vue fetch===================== ");
    return store.dispatch("shop/chk_shop").then(res => {
      console.log(res);
    });
  },
  computed: {
    ...mapState({
      order: state => state.order
    })
  },
  methods: {}
};
</script>
