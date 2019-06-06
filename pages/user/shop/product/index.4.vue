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
          <v-expansion-panel expand>
            <v-expansion-panel-content v-for="item in list1" :key="item.id">
              <template v-slot:header>
                <div v-text="item.name"></div>
              </template>
              <v-card>
                <v-card-text class="grey">
                  <draggable :list="item.option_group" group="option_group" @change="log">
                    <v-card-text
                      v-for="(element, index) in item.list2"
                      :key="element.name"
                    >{{ element.name }} {{ index }}</v-card-text>
                  </draggable>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 sm5 md5>
      <v-card>
        <draggable class="list-group" :list="list2" group="people" @change="log">
          <v-card-text
            v-for="(element, index) in option_group"
            :key="element.name"
          >{{ element.name }} {{ index }}</v-card-text>
        </draggable>
      </v-card>
    </v-flex>
    <!--
    <v-dialog v-model="dialog.on" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-text="dialog.name">상품</span>
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

              <v-flex xs12 sm6 md8>
                <template v-for="(item, index) in dialog.option_group">
                  <v-card :key="item.id">
                    <v-card-title>{{item.name}}</v-card-title>
                    <v-card-text>
                      <template v-for="(item_j, index_j) in item.opt">
                        <v-card :key="item_j.id">
                          <v-card-title>{{item_j.name}} {{item_j.price}} {{item_j.order}}</v-card-title>
                        </v-card>
                      </template>
                    </v-card-text>
                  </v-card>
                </template>
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
    -->
  </v-layout>
</template>
<script>
import draggable from "vuedraggable";
import rawDisplayer from "~/components/raw-displayer.vue";
import { mapState, mapGetters } from "vuex";
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
        on: false,
        name: "",
        price: 0,
        option_group: []
      },
      list1: [
        {
          name: "John",
          id: 1,
          option_group: [
            { name: "option_group", id: 5 },
            { name: "option_group", id: 6 },
            { name: "option_group", id: 7 }
          ]
        },
        {
          name: "Joao",
          id: 2,
          option_group: [
            { name: "option_group", id: 5 },
            { name: "option_group", id: 6 },
            { name: "option_group", id: 7 }
          ]
        },
        {
          name: "Jean",
          id: 3,
          option_group: [
            { name: "option_group", id: 5 },
            { name: "option_group", id: 6 },
            { name: "option_group", id: 7 }
          ]
        },
        {
          name: "Gerard",
          id: 4,
          option_group: [
            { name: "option_group", id: 5 },
            { name: "option_group", id: 6 },
            { name: "option_group", id: 7 }
          ]
        }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop
    })
    // ...mapGetters([product_list])
  },
  mounted: function() {
    //console.log(this.$store.getters) product/product_list
    // this.products = this.$store.getters.product_list;
    // this.list1 = this.products.clone();
    // this.list2 = this.option_group.clone();
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
  methods: {
/*
    dialog_on(id) {
      console.log(id);
      var found = this.products.find(function(element) {
        return element.id == id;
      });
      this.dialog.name = found.name;
      this.dialog.price = found.price;
      this.dialog.option_group = found.option_group;
      this.dialog.on = true;
    },
*/
    add: function() {
      console.log("methd --add ");
      this.$store.dispatch("product/push", { name: "Juan" });
      // this.list.push({ name: "Juan" });
    },
    replace: function() {
      console.log("methd --replace ");
      store.dispatch("product/replace", { name: "Juan" });
      //this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
