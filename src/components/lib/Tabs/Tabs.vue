<template>
  <div>
    <component v-for="c in defaults" :is="c" />
  </div>
</template>

<script lang="ts">
import { classMaker } from "../common/classMaker";
import Tab from "./Tab.vue";
export default {
  name: "BUI-Tabs",
  setup(props, context) {
    const defaults = context.slots.default();
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 的子标签必须是 Tab");
      }
    });
    const classes = classMaker("BUI-Tabs");
    return { classes, defaults };
  },
};
</script>

<style lang="scss">
</style>