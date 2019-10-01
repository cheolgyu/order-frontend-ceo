<template>
  <v-data-iterator :items="order.now" hide-default-footer>
    <template v-slot:header>
      <v-toolbar dark flat>
        <v-toolbar-title>주문 목록</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:default="props">
      <v-row>
        <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
          <v-card max-height="400">
            <v-card-title>
              <template v-if="item.state==1">
                <v-btn color="info" @click.stop="fnitem(item,1)" dark large>승인</v-btn>
                <v-btn color="error" @click.stop="fnitem(item,0)" dark large>거부</v-btn>
              </template>
              <template v-else-if="item.state=2">
                <v-btn color="success" @click.stop="fnitem(item,2)" dark large>제조완료</v-btn>
              </template>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item v-for="(item , j) in item.products" :key="'_'+j">
                <v-list-item-content>
                  <div class="title text--primary">{{item.name}}</div>
                  <v-chip-group column>
                    <v-chip
                      v-for="item in item.option_group_list"
                      :key="item.name"
                      :color="item.select_opt_id == item.default ? '' : 'deep-purple accent-4'"
                    >{{item.select_opt_name}}</v-chip>
                  </v-chip-group>
                </v-list-item-content>
              </v-list-item>
            </v-list>
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
  data: scope => ({ defaultClass: "defaultClass", activeClass: "activeClass" }),
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
      this.$store.dispatch("order/state", params, { root: true });
    }
  }
};
</script>
