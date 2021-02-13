<template>
  <div>Tabs 组件</div>
</template>

<script lang="ts">
import { classMaker } from "../common/classMaker";
export default {
  name: "BUI-Tabs",
  setup() {
    const classes = classMaker("BUI-Tabs");
    return { classes };
  },
};
</script>

<style lang="scss">
</style>