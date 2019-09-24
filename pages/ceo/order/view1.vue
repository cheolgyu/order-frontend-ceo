<template>
  <v-data-iterator :items="order.list">
    <template v-slot:header>
      <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
        <v-toolbar-title>주문 목록</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:default="props">
      <v-row>
        <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
          <v-card max-height="400">
            <v-card-title>
              <h4>{{ item.id }}</h4>
              <v-btn color="info" @click.stop="fn_order(item,1)" dark large>승인</v-btn>
              <v-btn color="error" @click.stop="fn_order(item,0)" dark large>거부</v-btn>
              <v-btn color="success" @click.stop="fn_order(item,2)" dark large>제조완료</v-btn>
            </v-card-title>
            <v-divider></v-divider>
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
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <v-toolbar class="mt-2" color="indigo" dark flat>
        <v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-iterator>
</template>

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
    fn_order(item, s) {
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
<style scoped>
.activeClass {
  color: blue;
}
</style>