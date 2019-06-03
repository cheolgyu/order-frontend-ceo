<template>
  <v-layout row wrap>
    <!--
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
    -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-flex xs12 sm5 md5>
          <v-card dark color="primary">
            <v-btn fab dark small color="indigo" @click="get">
              <v-icon dark>get</v-icon>
            </v-btn>
            <div class="text-xs-center">
              <v-btn fab dark small color="green">
                <v-icon dark>remove</v-icon>
              </v-btn>
              <v-btn fab dark small color="indigo" v-on="on">
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
            <v-card-text>
              <v-list>
                <v-list-tile v-for="item in products" :key="item.name" avatar @click>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
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
      dialog: false
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
  methods: {
    get() {
      this.$store.dispatch("product/get", null).then(res => {
        console.log(res);
        if (res.status == 200) {
          alert("메일이 발송됬습니다.");
        } else if (res.status === 400) {
          alert(res.data);
        } else {
          alert("다시 시도하세요.");
        }
      });
    }
  },
  mounted: function() {}
};
</script>
