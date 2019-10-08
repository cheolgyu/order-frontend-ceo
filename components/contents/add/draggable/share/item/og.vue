<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="handle">drag_handle</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ label}}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-tooltip
        bottom
        :open-on-click="true"
        :open-on-hover="true"
        :offset-overflow="true"
        :allow-overflow="true"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
const props = {
  item: {
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
