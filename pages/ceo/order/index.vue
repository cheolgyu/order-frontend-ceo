<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>주문번호</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in order.list" v-bind:key="i">
          <td v-text="item.id"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.activeClass {
  color: blueviolet;
}
</style>
<script>
import { mapState } from "vuex";

export default {
  data: scope => ({
    show: false
  }),
  fetch({ store, params }) {
    console.log("=====================shop.vue fetch===================== ");
    return store.dispatch("order/get_list").then(res => {});
  },
  computed: {
    ...mapState({
      order: state => state.order,
      shop: state => state.shop.shop
    })
  },
  methods: {
    fnitem(item, s) {
      let params = {
        shop_id: this.shop.id,
        order_id: item.id,
        state: s,
        txt: this.shop,
        req_session_id: this.shop
      };
      console.log(" fnitem ", s, params);
      this.$store.dispatch("order/state", params, {
        root: true
      });
    }
  }
};
</script>
