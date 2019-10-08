<template>
  <v-chip outlined color="white" :key="'d__'+item.o_nm" close @click:close="event.remove(item)">
    <strong>
      <v-radio :label="label" color="info" :value="item.o_id"></v-radio>
    </strong>
  </v-chip>
</template>
<script>
const props = {
  item: {
    type: Object,
    default: () => ({})
  },
  event: {
    type: Object,
    default: () => ({})
  },
  label: {
    type: String,
    default: () => ({})
  }
};
export default {
  props,
  components: {},
  data: function() {
    return {
      message: "Some Message"
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
