<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" @click="addItem">New Item</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="form.opt_group.id" label="아이디"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="form.opt_group.name" label="이름"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="form.opt_group.options" label="옵션들"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
        <v-btn color="blue darken-1" flat @click="save">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      type: "insert",
      send: {
        insert: {
          action: "option_group/add"
        },
        update: {
          action: "option_group/update"
        }
      },
      formTitle: "타이틀",
      form: {
        opt_group: {
          id: null,
          name: null,
          options: []
        },
        opt: {
          id: null,
          name: null,
          price: null
        }
      },
      editedIndex: null
    };
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      opt: state => state.option.list,
      opt_group: state => state.option_group.list
    })
  },
  mounted() {},

  fetch({ store, params }) {},

  methods: {
    editItem(item) {
      this.type = "update";
      this.formTitle = "상품옵션그룹: " + item.name + " 수정";
      this.form.opt_group = Object.assign({}, item);
      this.dialog = true;
    },
    addItem() {
      this.type = "insert";
      this.form.opt_group.id = null;
      this.formTitle = "상품옵션그룹: 생성";
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log(this.send[this.type].action);
      let params = this.form.opt_group;
      return this.$store
        .dispatch(this.send[this.type].action, params, { root: true })
        .then(res => {
          console.log(res);
          alert(res);
        });
      this.close();
    }
  }
};
</script>
