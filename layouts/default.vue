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
  created() {
    let store = window.$nuxt.$store;
    store.subscribe((mutation, state) => {
      localStorage.setItem("togo82_state", JSON.stringify(state));
    });
  },
  data(scope) {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: scope.$t("word.dashboard"),
          to: "/ceo/dashboard"
        },
        {
          icon: "bubble_chart",
          title: scope.$t("word.order"),
          to: "/ceo/order"
        },
        {
          icon: "bubble_chart",
          title: scope.$t("word.shop"),
          to: "/ceo/shop"
        },
        {
          icon: "bubble_chart",
          title: scope.$t("word.product"),
          to: "/ceo/product"
        },
        {
          icon: "bubble_chart",
          title: scope.$t("word.option_group"),
          to: "/ceo/option_group"
        },
        {
          icon: "bubble_chart",
          title: scope.$t("word.option"),
          to: "/ceo/option"
        },
        {
          icon: "bubble_chart",
          title: scope.$t("word.profile"),
          to: "/ceo/profile"
        }
      ],
      miniVariant: false,
      right: true,
      title: scope.$t("word.title")
    };
  },
  computed: {
    ...mapState({
      order: state => state.order
    })
  }
};
</script>
