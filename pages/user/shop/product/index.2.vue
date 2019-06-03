<template>
  <v-layout row wrap>
    <v-flex xs12 sm5 md5>
      <v-card dark color="primary">
        <div class="text-xs-center">
          <v-btn fab dark small color="green">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-chip color="orange" text-color="white">
            Premium
            <v-icon right>star</v-icon>
          </v-chip>
        </div>
        <v-card-text>
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title" avatar @click>
              <v-list-tile-action>
                <v-icon v-if="item.icon" color="pink">star</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-chip v-model="chip4" close color="orange" label outline>Complete</v-chip>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm5 md5 offset-xs0 offset-lg2>
      <v-card dark color="green">
        <v-card-text>
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title" avatar @click>
              <v-list-tile-action>
                <v-icon v-if="item.icon" color="pink">star</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import draggable from "vuedraggable";
import rawDisplayer from "~/components/raw-displayer.vue";
import { mapState } from "vuex";
let id = 1;
export default {
  name: "simple",
  display: "Simple",
  order: 0,
  components: {
    draggable,
    rawDisplayer
  },
  data() {
    return {
      items: [
        {
          icon: true,
          title: "아이스 아메리카노",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          title: "아메리카노",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      products: state => state.product.list
    })
  },
  mounted: function() {},
  computed: {
    list: {
      get() {
        return this.$store.state.product.list;
      },
      set(value) {
        console.log(value);
        //this.$store.commit("updateList", value);
      }
    },
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
    add: function() {
      this.$store.dispatch("product/push", { name: "Juan " + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.txt {
  background: green;
}
</style>