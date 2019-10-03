<template>
  <v-data-iterator :items="order.now" hide-default-footer>
    <template v-slot:header>
      <v-toolbar dark flat>
        <v-toolbar-title>주문 목록</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:default="props">
      <v-row v-for="item,i in props.items" :key="i">
        <v-col>
          <v-card class="mx-auto">
            <v-card-title>
              <v-toolbar dense extended>
                <v-toolbar-title>주문번호:{{item.id}}</v-toolbar-title>
                <template #extension>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <template v-if="item.state == 1">
                      <v-btn rounded color="info" @click.stop="fnitem(item, 1)">승인</v-btn>
                      <v-btn rounded color="error" @click.stop="fnitem(item, 0)">거부</v-btn>
                    </template>
                    <template v-else-if="(item.state = 2)">
                      <v-btn rounded color="success" @click.stop="fnitem(item, 2)">제조완료</v-btn>
                    </template>
                  </v-toolbar-items>
                </template>
              </v-toolbar>
            </v-card-title>
            <v-card-text>
              <v-card v-for="(p_group, j) in item.products" :key="i+j" cols="1" raised>
                <v-card-text>
                  <v-list shaped>
                    <v-subheader>{{ p_group[0].name }} X {{ p_group.length }}</v-subheader>
                    <v-list-item-group>
                      <v-list-item v-for="p,k in p_group" :key="i+j+k">
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
                            >{{ optg.select_opt_name }}</v-chip>
                          </v-chip-group>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions />
          </v-card>
        </v-col>
      </v-row>
    </template>
    <!--
    <template v-slot:footer>
      <v-toolbar>
        <v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
      </v-toolbar>
    </template>
    -->
  </v-data-iterator>
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
