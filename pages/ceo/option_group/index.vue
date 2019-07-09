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
  data() {
    return {
      type: CONSTANTS.OPTION_GROUP,
      title: "상품옵션그룹 목록",
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
          text: "옵션들",
          value: "options",
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
