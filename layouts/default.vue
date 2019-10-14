<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-badge>
        <template v-slot:badge>{{order.cnt}}</template>
        <v-icon>{{order.icon.state}}</v-icon>
      </v-badge>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
    <ws />
    <fb />
  </v-app>
</template>

<script>
import ws from "~/components/ws.vue";
import fb from "~/components/fb.vue";
import { mapState, mapGetters } from "vuex";
export default {
  middleware: "auth",
  components: { ws, fb },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "대시보드",
          to: "/ceo/dashboard"
        },
        {
          icon: "bubble_chart",
          title: "주문",
          to: "/ceo/order"
        },
        {
          icon: "bubble_chart",
          title: "주문1",
          to: "/ceo/order/view1"
        },
        {
          icon: "bubble_chart",
          title: "주문2",
          to: "/ceo/order/view2"
        },
        {
          icon: "bubble_chart",
          title: "주문3",
          to: "/ceo/order/view3"
        },
        {
          icon: "bubble_chart",
          title: "전체",
          to: "/ceo/order/list"
        },
        {
          icon: "bubble_chart",
          title: "상점",
          to: "/ceo/shop"
        },
        {
          icon: "bubble_chart",
          title: "상품",
          to: "/ceo/product"
        },
        {
          icon: "bubble_chart",
          title: "상품옵션그룹",
          to: "/ceo/option_group"
        },
        {
          icon: "bubble_chart",
          title: "상품옵션",
          to: "/ceo/option"
        },
        {
          icon: "bubble_chart",
          title: "프로필",
          to: "/ceo/profile"
        }
      ],
      miniVariant: false,
      right: true,
      title: "사장님"
    };
  },
  computed: {
    ...mapState({
      order: state => state.order
    })
  }
};
</script>
