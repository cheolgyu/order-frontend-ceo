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
      type: CONSTANTS.OPTION_GROUP,
      action: CONSTANTS.ADD,
      title: {
        left: "옵션그룹",
        left_down: "옵션",
        right: "옵션"
      },
      form: {
        name: null,
        price: 0,
        options: []
      }
    };
  }
};
</script>
