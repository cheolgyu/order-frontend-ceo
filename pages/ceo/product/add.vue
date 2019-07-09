<template>
  <draggable :type="type" :title="title" :form="form" :action="action" />
</template>
<script>
import draggable from "~/components/contents/add/draggable.vue";
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
      },
      form: {
        name: null,
        price: 0,
        opt_group: []
      }
    };
  }
};
</script>
