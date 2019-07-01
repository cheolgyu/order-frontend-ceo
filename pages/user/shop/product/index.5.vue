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
              <v-expansion-panel-content   v-for="(item,index) in list1"
              :key="index+'_'+item.id">
                <template v-slot:header>
                  <div v-text="item.name"></div>
                </template>
                <draggable
                  :list="item.option_group"
                  group="my_option_group"
                  @change="log"
                  v-for="(element, index_j) in item.option_group"
                  :key="index+'_'+index_j+'_'+element.name"
                >
                  <v-card-text>
                    {{ element.name }}
                    <v-btn flat icon color="green" @click="removeAt(index,index_j)">
                      <v-icon dark>close</v-icon>
                    </v-btn>
                  </v-card-text>
                </draggable>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm2 md5>
      <draggable :list="list3" group="my_option_group" @change="log">
        <v-icon dark large>delete_outline</v-icon>
      </draggable>
    </v-flex>
    <v-flex xs12 sm5 md5>
      <v-card>
        <draggable
          :list="list2"
          :group="{ name: 'my_option_group', pull: 'clone', put: false }"
          @change="log"
        >
          <v-btn
            round
            color="info"
            dark
            v-for="(element, index) in list2"
            :key="'d_'+index+'_'+element.name"
          >{{ element.name }}</v-btn>
        </draggable>
      </v-card>
    </v-flex>
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
      list1: [
        {
          name: "아이스아메리카노",
          id: 1,
          option_group: [
            { name: "샷추가", id: 1 },
            { name: "차가운/뜨거운", id: 2 },
            { name: "컵사이즈", id: 3 }
          ]
        },
        {
          name: "따뜻한아메리카노",
          id: 2,
          option_group: [
            { name: "샷추가", id: 1 },
            { name: "차가운/뜨거운", id: 2 },
            { name: "컵사이즈", id: 3 }
          ]
        },
        {
          name: "카페라떼",
          id: 3,
          option_group: [
            { name: "샷추가", id: 1 },
            { name: "차가운/뜨거운", id: 2 },
            { name: "컵사이즈", id: 3 }
          ]
        },
        {
          name: "바닐라 딜라이트",
          id: 4,
          option_group: [
            { name: "샷추가", id: 1 },
            { name: "차가운/뜨거운", id: 2 },
            { name: "컵사이즈", id: 3 }
          ]
        },
        {
          name: "콜드블루 딜라이트",
          id: 4,
          option_group: [
            { name: "샷추가", id: 1 },
            { name: "차가운/뜨거운", id: 2 },
            { name: "컵사이즈", id: 3 }
          ]
        }
      ],
      list2: [
        { name: "샷추가", id: 101 },
        { name: "차가운/뜨거운", id: 102 },
        { name: "컵사이즈", id: 103 },
        { name: "크림추가", id: 104 },
        { name: "바닐라크림추가", id: 105 },
        { name: "초코크림추가", id: 106 }
      ],
      list3: []
    };
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop
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
  methods: {
    clone_group({ id, name }) {
      console.log(id, name);
      return {
        id: id,
        name: `${name}`
      };
    },
    removeAt(idx, idx_j) {
      console.log("methd --removeAt ", this.list1);
      this.list1[idx].option_group.splice(idx_j, 1);
    },
    add: function() {
      console.log("methd --add ", this.list);
      //this.$store.dispatch("product/push", { name: "Juan" });
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      console.log("methd --replace ", this.list);
      //store.dispatch("product/replace", { name: "Juan" });
      this.list = [{ name: "Edgard" }];
    },
    onMoveCallback: function(evt, originalEvent) {
      console.log("methd --moved ", evt, originalEvent);
      //store.dispatch("product/replace", { name: "Juan" });
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
