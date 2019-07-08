<template>
  <tb :headers="headers" :tb_items="tb_items" :title="title" :form="form" />
</template>
<script>
import tb from "~/components/contents/index/tb.vue";
import CONSTANTS from "~/components/constants.vue";

export default {
  components: {
    tb,
    CONSTANTS
  },
  data() {
    return {
      tb_items: CONSTANTS.PRODUCT,
      title: "상품목록",
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
