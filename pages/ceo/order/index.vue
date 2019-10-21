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
        <tr v-for="(order_obj,i) in order.list" v-bind:key="i">
          <td v-text="order_obj.shop_order_id"></td>
          <td v-text="to_string.order_state(order_obj.state)"></td>
          <td v-text="order_obj.price"></td>

          <td>
            <ul>
              <template v-for="p_group, key_p_id in order_obj.products">
                <template v-for="p_obj,p_order_i in p_group">
                  <li>{{p_obj.p_nm}}x{{p_group.length}} = {{p_obj.total_p_price}}</li>
                </template>
              </template>
            </ul>
          </td>
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
import to_string from "~/components/to_string.vue";

export default {
  components: { to_string },
  data: scope => ({
    show: false,
    to_string: to_string
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
