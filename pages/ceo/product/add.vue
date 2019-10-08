<template>
  <draggable :type="type" :title="title" :action="action" />
</template>
<script>
import draggable from "~/components/contents/add/draggable/index.vue";
import CONSTANTS from "~/components/constants.vue";

export default {
  components: { draggable, CONSTANTS },
  data() {
    return {
      type: CONSTANTS.PRODUCT,
      action: CONSTANTS.ADD,
      title: {
        left: "상품",
        left_down: "옵션그룹",
        right: "옵션그룹"
      }
    };
  }
};
</script>
