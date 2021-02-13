<template>
  <div><slot /></div>
</template>

<script lang="ts">
import { classMaker } from "../common/classMaker";
export default {
  name: "BUI-Tab",
  setup() {
    const classes = classMaker("BUI-Tab");
    return { classes };
  },
};
</script>

<style lang="scss">
</style>