<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title to="/" v-text="title" />
      <v-spacer />
      <v-btn to="/login" dark icon>
        <v-icon>person</v-icon>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import fb from "~/components/fb.vue";

export default {
  components: { fb },
  middleware: "pub",
  data() {
    return {
      items: [
        {
          icon: "apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "bubble_chart",
          title: "회원가입",
          to: "/join"
        },
        {
          icon: "bubble_chart",
          title: "로그인",
          to: "/login"
        }
      ],
      title: "사장님"
    };
  }
};
</script>
