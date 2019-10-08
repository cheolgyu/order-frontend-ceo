<template></template>

<script>
import { mapState } from "vuex";

export default {
  data: scope => ({
    ws_conn: null,
    wsUri: process.env.VUE_APP_WS_URL
  }),
  created() {
    this.conn();
  },
  fetch({ store, params }) {},
  computed: {
    ...mapState({
      order: state => state.order
    })
  },
  methods: {
    conn() {
      var _self = this;
      // The `fetch` method is used to fill the store before rendering the page
      this.ws_conn = new WebSocket(this.wsUri);
      this.$store.dispatch("ws/set", this.ws_conn);
      //
      this.ws_conn.onopen = function() {
        _self.join();
      };
      this.ws_conn.onmessage = function(e) {
        _self.onmessage(e.data);
      };
      this.conn.onclose = function() {
        this.ws_conn = null;
        // update_ui()
      };
    },
    onmessage(msg) {
      this.$store.dispatch("order/now", msg, { root: true });
    },
    join(msg) {
      this.$store.dispatch("ws/join", null, { root: true });
    }
  }
};
</script>
