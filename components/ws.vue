<template></template>

<script>
import { mapState } from "vuex";

export default {
  data: scope => ({
    ws_conn: null,
    wsUri: "ws://127.0.0.1:3001/ws/"
  }),
  created() {
    console.log("ws.vue created");
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
      console.log("Connecting...");
      this.ws_conn = new WebSocket(this.wsUri);
      this.$store.dispatch("ws/set", this.ws_conn);
      //
      this.ws_conn.onopen = function() {
        console.log("Connected.");
        _self.join();
      };
      this.ws_conn.onmessage = function(e) {
        console.log("Received: " + this, e.data);
        _self.onmessage(e.data);
      };
      this.conn.onclose = function() {
        console.log("Disconnected.");
        this.ws_conn = null;
        // update_ui()
      };
    },
    onmessage(msg) {
      this.$store.dispatch("order/set_order", msg, { root: true });
    },
    join(msg) {
      this.$store.dispatch("ws/join", null, { root: true });
    }
  }
};
</script>
