<template></template>

<script>
export default {
  created() {
    console.log(
      "============================================================="
    );
    console.log("fb.vue created()", this.$fb_sw_token, this);
    console.log(
      "============================================================="
    );
    let messaging = this.$fb_sw_token;

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      } else {
        console.log("Unable to get permission to notify.");
      }
    });

    this.sendTokenToServer();
  },
  mounted() {},
  methods: {
    sendTokenToServer() {
      this.$store
        .dispatch("sw/save_token", this.$fb_sw_token, { root: true })
        .then(res => {
          this.$store.dispatch("sw/check", null, { root: true }).then(res => {
            console.log(res);
          });
        });
      /* 
      this.$store
        .dispatch("sw/save_token", this.$fb_sw_token, { root: true })
        .then(res => {
          this.$store.dispatch("sw/reg_token", null, { root: true });
        });
        */
    }
  }
};
</script>

<style>
</style>