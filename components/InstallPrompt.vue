<template>
  <v-btn dark icon @click="install">
    <v-icon>add_to_home_screen</v-icon>
  </v-btn>
</template>
<script>
// src/components/InstallPrompt.vue
let installEvent;
export default {
  name: "installPrompt",
  data() {
    return {};
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      console.log("beforeinstallprompt", e);
      e.preventDefault();
      installEvent = e;
    });
  },
  methods: {
    install() {
      if (installEvent != null) {
        installEvent.prompt();
        installEvent.userChoice.then(() => {
          // promptEvent = null;
        });
      } else {
        console.log("installEvent is null", installEvent);
      }
    }
  }
};
</script>