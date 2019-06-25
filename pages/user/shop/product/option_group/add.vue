<template>
  <v-container fluid></v-container>
</template>
<script>
import OptGroupDialog from "~/components/OptGroupDialog.vue";
import draggable from "vuedraggable";
import Sortable from "sortablejs";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    OptGroupDialog
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      user: state => state.user.user,
      shop: state => state.shop.shop,
      opt: state => state.option.list,
      opt_group: state => state.option_group.opt_group
    })
  },
  mounted() {
    // here is the Vue code
    this.start_sort();
  },

  fetch({ store, params }) {
    store.dispatch("option_group/get_list", params, { root: true });
    store.dispatch("option/get_list", params, { root: true });
  },

  methods: {
    d_open(item) {
      this.$refs.r_dialog.editItem(item);
    },
    start_sort() {
      //let t1 = tbsort(".tb-option_group tbody", "tb-option_group", false);
      //let t2 = tbsort(".tb-option tbody", "group_options", true);
      //let t3 = tbsort(".group_option_list", "group_options", false);
    },
    submit(t) {
      let action = "option_group/add";
      let params = this.$data.form.opt_group;
      if (t == "opt") {
        action = "option/add";
        params = this.$data.form.opt;
      }
      params.id = null;
      return this.$store.dispatch(action, params, { root: true }).then(res => {
        alert(res);
      });
    },
    submit_update(t) {
      let action = "option_group/update";
      let params = this.$data.form.opt_group;
      if (t == "opt") {
        action = "option/update";
        params = this.$data.form.opt;
      }
      return this.$store.dispatch(action, params, { root: true }).then(res => {
        alert(res);
      });
    },
    editItem(t, item) {
      let params = this.$data.form.opt_group;
      if (t == "opt_group") {
        this.$data.form.opt_group.id = item.id;
        this.$data.form.opt_group.name = item.name;
        this.$data.form.opt_group.options = item.options;
      } else if (t == "opt") {
        this.$data.form.opt.id = item.id;
        this.$data.form.opt.name = item.name;
        this.$data.form.opt.price = item.price;
      }
    },
    reset(t) {
      if (t == "opt_group") {
        this.$data.form.opt_group.id = null;
        this.$data.form.opt_group.name = null;
        this.$data.form.opt_group.options = [];
      } else if (t == "opt") {
        this.$data.form.opt.id = null;
        this.$data.form.opt.name = null;
        this.$data.form.opt.price = null;
      }
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
