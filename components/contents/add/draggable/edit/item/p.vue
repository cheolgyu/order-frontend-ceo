<template>
  <div>
    <v-chip outlined color="white" :key="'d__'+item.og_nm" close @click:close="event.remove(item)">
      <strong>
        <v-radio :label="label" color="info" :value="item.og_id"></v-radio>
      </strong>
    </v-chip>
  </div>
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
