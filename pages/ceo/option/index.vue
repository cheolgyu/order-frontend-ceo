<template></template>
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
      type: CONSTANTS.OPTION,
      title: "상품옵션 목록",
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
          value: "price"
        },
        {
          text: "관리",
          sortable: false
        }
      ]
    };
  }
};
</script>
