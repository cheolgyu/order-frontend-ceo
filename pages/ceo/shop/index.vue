<template>
  <v-list>
    <v-list-group color="primary" v-for="(_order, i) in order.list" :key="i" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            <v-btn color="info" dark large>{{_order.id}}/{{_order.req_session_id}}</v-btn>
            <v-btn color="info" @click.stop="fn_order(_order,'y')" dark large>수락</v-btn>
            <v-btn color="error" @click.stop="fn_order(_order,'n')" dark large>거부</v-btn>
            <v-btn color="success" @click.stop="fn_order(_order,'z')" dark large>수령</v-btn>
            <v-chip v-for="(item , j) in _order.products" :key="'o_'+i+'_'+j">
              {{item.name}}
              <v-icon right>star</v-icon>
            </v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-chip v-for="(item , j) in _order.products" :key="'o_'+i+'_'+j">
              {{item.name}}
              <v-icon right>star</v-icon>
            </v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
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
      order: state => state.order,
      shop: state => state.shop.shop
    })
  },
  methods: {
    fn_order(item, s) {
      console.log(this.shop.id);
      let params = {
        shop_id: this.shop.id,
        order_id: item.id,
        state: s,
        txt: this.shop,
        req_session_id: this.shop
      };
      console.log(" fn_order ", s, params);
      this.$store.dispatch("order/state", params, { root: true });
    }
  }
};
</script>
