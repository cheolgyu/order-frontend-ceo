<template>
  <v-list>
    <v-list-group color="primary" v-for="(list, i) in order.list" :key="i" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            <v-btn color="info" dark large>수락</v-btn>
            <v-btn color="error" dark large>거부</v-btn>
            <v-btn color="success" dark large>수령</v-btn>
            <v-chip v-for="(item , j) in list" :key="'o_'+i+'_'+j">
              {{item.name}}
              <v-icon right>star</v-icon>
            </v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-chip v-for="(item , j) in list" :key="'o_'+i+'_'+j">
              {{item.name}}
              <v-icon right>star</v-icon>
            </v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: scope => ({}),
  fetch({ store, params }) {
    console.log("=====================shop.vue fetch===================== ");
    return store.dispatch("shop/chk_shop").then(res => {
      console.log(res);
    });
  },
  computed: {
    ...mapState({
      order: state => state.order
    })
  },
  methods: {}
};
</script>
