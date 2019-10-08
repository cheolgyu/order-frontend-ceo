<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>응답</th>
          <th>가격</th>
          <th>상품들</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in order.list" v-bind:key="i">
          <td v-text="item.id"></td>
          <td
            v-text="item.state"
          >COMMENT ON COLUMN "order"."state" IS '-2: 미응답거절, -1: 거절, 1: 대기, 2: 수락, 3: 수령 ';</td>
          <td v-text="item.price"></td>

          <td v-text="item.products"></td>
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
      this.$store.dispatch("order/state", params, {
        root: true
      });
    }
  }
};
</script>
