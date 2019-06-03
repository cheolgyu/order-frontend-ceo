<template>
  <div class="row">
    <div class="col-2">
      <div class="form-group">
        <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
          <button class="btn btn-secondary" @click="add">Add</button>
          <button class="btn btn-secondary" @click="replace">Replace</button>
        </div>

        <div class="form-check">
          <input id="disabled" type="checkbox" v-model="enabled" class="form-check-input">
          <label class="form-check-label" for="disabled">DnD enabled</label>
        </div>
      </div>
    </div>

    <div class="col-6">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable
        :list="list"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div class="list-group-item" v-for="element in list" :key="element.name">{{ element.name }}</div>
      </draggable>
    </div>

    <rawDisplayer class="col-3 txt" :value="list" title="List"/>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import rawDisplayer from "~/components/raw-displayer.vue";
import { mapState } from "vuex";
let id = 1;
export default {
  layout: "pub",
  name: "simple",
  display: "Simple",
  order: 0,
  components: {
    draggable,
    rawDisplayer
  },
  data() {
    return {
      enabled: true,
      dragging: false
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