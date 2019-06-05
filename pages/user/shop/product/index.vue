<template>
  <v-layout row wrap>
    <v-flex xs12 sm5 md5>
      <v-card dark color="primary">
        <v-btn fab dark small color="indigo">
          <v-icon dark>get</v-icon>
        </v-btn>
        <div class="text-xs-center">
          <v-btn fab dark small color="green">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo" @click="dialog.on = true">
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
        <v-card-text>
          <v-list>
            <v-list-tile v-for="item in products" :key="item.id" avatar @click.stop="dialog_on(item.id)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog.on"  max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">상품</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="상품이름*" required v-model="dialog.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="가격" v-model="dialog.price"></v-text-field>
              </v-flex>

               <v-flex xs12 sm6 md4>
                <v-text-field label="옵션들" v-model="dialog.option_group"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog.on = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog.on = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: {
        on : false,
        name: "",
        price:0,
        option_group:[]
      }
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
  fetch({ store, params }) {
    console.log("product.vue fetch start=====================");
    store.dispatch("product/get", null).then(res => {
      console.log("store.dispatch(product/get, null)===>", res);
      if (res.status == 200) {
      } else if (res.status === 400) {
        alert(res.data);
      } else {
        alert("다시 시도하세요.");
      }
    });
  },
  methods:  {
    dialog_on(id){
      console.log(id);
      var found = this.products.find(function(element) {
        return element.id == id;
      });
      this.dialog.name = found.name;
      this.dialog.price = found.price;
      this.dialog.option_group = found.option_group;
      this.dialog.on = true;
    }
  }
};
</script>
