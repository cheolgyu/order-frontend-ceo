<template></template>

<script>
export default {
  created() {
    let messaging = this.$fb_sw_token;

    Notification.requestPermission().then(permission => {});

    this.sendTokenToServer();
  },
  mounted() {},
  methods: {
    sendTokenToServer() {
      this.$store.dispatch("sw/save_token", this.$fb_sw_token, { root: true });
    }
  }
};
</script>

<style>
</style>