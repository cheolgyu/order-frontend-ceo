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
      // The `fetch` method is used to fill the store before rendering the page
      console.log("Connecting...");
      this.ws_conn = new WebSocket(this.wsUri);
      this.$store.dispatch("ws/set", this.ws_conn);
      //
      this.ws_conn.onopen = function() {
        console.log("Connected.");
      };
      this.ws_conn.onmessage = function(e) {
        console.log(e);
        console.log(typeof e.data);
        console.log("Received: " + e.data);
        this.$store.dispatch("order/set_order", e.data, { root: true });
      };
      this.conn.onclose = function() {
        console.log("Disconnected.");
        this.ws_conn = null;
        // update_ui()
      };
    }
  }
};
</script>
