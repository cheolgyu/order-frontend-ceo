<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-list shaped>
      <v-subheader>주문 목록</v-subheader>
      <v-list-group color="primary" v-for="order_obj,i in order.now" :key="i" append-icon>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{order_obj.id}}번</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <template v-if="order_obj.state == 1">
              <v-btn rounded color="info" @click.stop="fnitem(order_obj, 1)">승인</v-btn>
              <v-btn rounded color="error" @click.stop="fnitem(order_obj, 0)">거부</v-btn>
            </template>
            <template v-else-if="order_obj.state == 2">
              <v-btn rounded color="success" @click.stop="fnitem(order_obj, 2)">제조완료</v-btn>
            </template>
          </v-list-item-icon>
        </template>

        <v-list-item v-for="(p_arr, j) in order_obj.products" :key="i+j">
          <v-list rounded dense>
            <v-list-group color="info" append-icon>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ p_arr[0].p_nm }} X {{ p_arr.length }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="p_obj,k in p_arr" :key="i+j+k">
                <v-list-item-content>
                  <v-chip-group column>
                    <v-chip
                      :ripple="false"
                      outlined
                      v-for="optg,n in p_obj.og"
                      :key="i+j+k+n"
                      :color="
                           optg.select_opt_id == optg.og_default
                             ? ''
                             : 'deep-purple accent-4'
                         "
                      v-text="optg.select_opt_name+''"
                    ></v-chip>
                  </v-chip-group>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
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
    return store.dispatch("shop/chk_shop").then(res => {});
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
