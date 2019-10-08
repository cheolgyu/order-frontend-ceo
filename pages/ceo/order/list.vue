<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-list shaped nav>
      <v-subheader>주문 목록</v-subheader>
      <v-list-group color="primary" v-for="item,i in order.now" :key="i">
        <template v-slot:activator>
          <v-list-item-action>
            <v-checkbox></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>주문번호:{{item.id}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <template v-if="item.state == 1">
              <v-btn rounded color="info" @click.stop="fnitem(item, 1)">승인</v-btn>
              <v-btn rounded color="error" @click.stop="fnitem(item, 0)">거부</v-btn>
            </template>
            <template v-else-if="(item.state = 2)">
              <v-btn rounded color="success" @click.stop="fnitem(item, 2)">제조완료</v-btn>
            </template>
          </v-list-item-icon>
        </template>

        <v-list-item v-for="(p_group, j) in item.products" :key="i+j">
          <v-list rounded tag="i">
            <v-list-group sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title width="100%">{{ p_group[0].name }} X {{ p_group.length }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="p,k in p_group" :key="i+j+k">
                <v-list-item-action>
                  <v-checkbox></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-chip-group column>
                    <v-chip
                      v-for="optg,n in p.option_group_list"
                      :key="i+j+k+n"
                      :color="
                           optg.select_opt_id == optg.default
                             ? ''
                             : 'deep-purple accent-4'
                         "
                      v-text="optg.select_opt_name"
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
