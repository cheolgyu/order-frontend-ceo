<template>
  <tb :headers="headers" :type="type" :title="title" />
</template>
<script>
import tb from "~/components/contents/index/tb.vue";
import CONSTANTS from "~/components/constants.vue";

export default {
  components: {
    tb,
    CONSTANTS
  },
  fetch({ store, params }) {
    store.dispatch("product/get_list", null).then(res => {});
    store.dispatch("option_group/get_list", null).then(res => {});
    store.dispatch("option/get_list", null).then(res => {});
  },
  data() {
    return {
      type: CONSTANTS.PRODUCT,
      title: "상품목록",
      headers: [
        {
          sortable: false
        },
        {
          text: "이름",
          align: "left",
          value: "name"
        },
        {
          text: "가격",
          value: "price",
          sortable: false
        },
        {
          text: "옵션그룹",
          value: "opt_group",
          sortable: false
        },
        {
          text: "",
          value: "options",
          sortable: false
        }
      ]
    };
  }
};
</script>
