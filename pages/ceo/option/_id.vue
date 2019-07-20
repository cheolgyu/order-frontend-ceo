<template>
  <opt :type="type" :action="action" :form="form" />
</template>
<script>
import opt from "~/components/contents/add/opt.vue";
import CONSTANTS from "~/components/constants.vue";

export default {
  components: { opt, CONSTANTS },
  data() {
    return {
      type: CONSTANTS.OPTION,
      action: CONSTANTS.UPDATE,
      form: {
        id: null,
        name: null,
        price: 0,
        html_type: null
      }
    };
  }
};
</script>
