<template>
  <div>
    <h1>Super secret page {{ auth }}</h1>
    <p>If you try to access this URL not connected, you will see the error page telling your that you are not connected.</p>
    <NuxtLink to="/">Back to the home page</NuxtLink>
    <v-btn @click="conn" text="conn" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  // middleware: 'auth',
  data: () => ({
    ws_conn: null,
    wsUri: "ws://127.0.0.1:3000/ws/"
  }),
  computed: {
    ...mapState({
      auth: state => state.user.auth
    })
  },
  methods: {
    conn() {
      // The `fetch` method is used to fill the store before rendering the page
      this.ws_conn = new WebSocket(this.wsUri);
      this.ws_conn.onopen = function() {};
      this.ws_conn.onmessage = function(e) {};
      this.conn.onclose = function() {
        this.ws_conn = null;
        // update_ui()
      };
    }
  }
};
/**
 * 
export default {
  middleware: 'auth'
}
 */
</script>
