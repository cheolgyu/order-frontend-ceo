<template>
  <v-container grid-list-xs>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item,i) in order.list" :key="i">
        <v-expansion-panel-header>
          <template v-if="item.state == 1">
            <v-btn color="info" @click.stop="fn_order(item,1)" dark large>승인</v-btn>
            <v-btn color="error" @click.stop="fn_order(item,-1)" dark large>거부</v-btn>
          </template>
          <template v-if="item.state == 2">
            <v-btn color="success" @click.stop="fn_order(item,2)" dark large>제조완료</v-btn>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item v-for="(item , j) in item.products" :key="'_'+j">
              <v-list-item-content>{{item.name}}:</v-list-item-content>
              <v-list-item-content class="align-end">
                <ul>
                  <template v-for="item in item.option_group_list">
                    <li
                      :key="item.name"
                      v-bind:class="[item.select_opt_id == item.default ? defaultClass : activeClass ]"
                    >{{item.select_opt_id}}/{{item.select_opt_name}}/{{item.select_opt_price}}</li>
                  </template>
                </ul>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: scope => ({ defaultClass: "defaultClass", activeClass: "activeClass" }),
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
    fn_order(item, s) {
      let params = {
        shop_id: this.shop.id,
        order_id: item.id,
        state: s,
        txt: this.shop,
        req_session_id: this.shop
      };

      this.$store.dispatch("order/state", params, { root: true });
    }
  }
};
</script>
<style scoped>
.activeClass {
  color: blue;
}
</style>