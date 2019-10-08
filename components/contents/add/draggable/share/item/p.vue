<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="handle">drag_handle</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ item.og_nm }}</v-list-item-title>
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

        <p
          v-for="o in item.o"
          :key="o.o_id"
          v-bind:class="item.og_default== o.o_id? 'info--text font-weight-bold' : ''"
        >{{event.get_label(o)}}</p>
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
  created() {},
  mounted() {},
  methods: {}
};
</script>
