<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 grow color="grey">
        <v-form>
          <v-toolbar>
            <v-toolbar-title>옵션명</v-toolbar-title>
          </v-toolbar>
          <v-card dark>
            <v-card-title>
              <v-text-field v-model="edit_form.name" label="이름"></v-text-field>
              <v-text-field v-model="edit_form.price" label="가격" type="text"></v-text-field>
              <v-select
                :items="items"
                v-model="edit_form.html_type"
                item-text="text"
                item-value="value"
                label="옵션타입"
              ></v-select>
            </v-card-title>
          </v-card>
          <v-btn color="success" @click="submit">ok</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import CONSTANTS from "~/components/constants.vue";

const props = {
  type: {
    required: true,
    type: String
  },
  action: {
    required: true,
    type: String
  },
  form: {
    type: Object,
    default: () => ({})
  }
};
export default {
  props,
  components: {},
  data() {
    return {
      items: [{ text: "선택", value: "s" }, { text: "증감", value: "i" }],
      CONSTANTS: CONSTANTS,
      edit_form: props.form,
      origin_list: [],
      tmp_list: [],
      dispatch_action: null,
      params: null
    };
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      opt: state => state.option.list,
      opt_group: state => state.option_group.list,
      products: state => state.product.list
    })
  },
  mounted() {
    this.if_action();
  },
  methods: {
    if_action() {
      this.dispatch_action =
        this.action === CONSTANTS.ADD ? "option/add" : "option/update";

      if (this.action == CONSTANTS.UPDATE) {
        let id = this.$route.params.id;
        let items = this.opt;

        let edit = items.find(function(el) {
          if (el.id == id) return el;
        });
        this.edit_form = JSON.parse(JSON.stringify(edit)); //Object.assign({}, edit);
      }
    },
    submit() {
      return this.$store
        .dispatch(this.dispatch_action, this.edit_form, { root: true })
        .then(res => {
          alert(res);
        });
    }
  }
};
</script>
