<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "대시보드",
          to: "/user/dashboard"
        },
        {
          icon: "bubble_chart",
          title: "상점",
          to: "/user/shop"
        },
        {
          icon: "bubble_chart",
          title: "상품",
          to: "/user/shop/product"
        },
        {
          icon: "bubble_chart",
          title: "상품옵션그룹",
          to: "/user/shop/product/option_group"
        },
        {
          icon: "bubble_chart",
          title: "상품옵션",
          to: "/user/shop/product/option_group/option"
        },
        {
          icon: "bubble_chart",
          title: "프로필",
          to: "/user/profile"
        }
      ],
      miniVariant: false,
      right: true,
      title: "사장님"
    };
  },
  computed: {}
};
</script>
