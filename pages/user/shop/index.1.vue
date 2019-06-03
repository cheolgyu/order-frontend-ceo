<template>
  <div>
    <h1>Super secret page {{ data }}</h1>
    <p>
      If you try to access this URL not connected, you will see the error page telling your that you are not connected.
    </p>
    <NuxtLink to="/">
      Back to the home page
    </NuxtLink>
    <v-btn @click="conn">
      conn
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: scope => ({
    ws_conn: null,
    wsUri: 'ws://127.0.0.1:3000/ws/'
  }),
  fetch({ store, params }) {
    return store.dispatch('shop/get').then(res => {
      console.log(res)
    })
  },
  computed: {
    ...mapState({
      data: state => state.shop.shop
    })
  },
  methods: {
    conn() {
      // The `fetch` method is used to fill the store before rendering the page
      console.log('Connecting...')
      this.ws_conn = new WebSocket(this.wsUri)
      this.ws_conn.onopen = function() {
        console.log('Connected.')
      }
      this.ws_conn.onmessage = function(e) {
        console.log(e)
        console.log('Received: ' + e.data)
      }
      this.conn.onclose = function() {
        console.log('Disconnected.')
        this.ws_conn = null
        // update_ui()
      }
    }
  }
}
</script>
