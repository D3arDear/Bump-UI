<template>
  <div :class="classes('', '', '')"><slot /></div>
</template>

<script lang="ts">
import { classMaker } from "../common/classMaker";
export default {
  name: "BUI-Tab",
  props: {
    title: String,
  },
  setup() {
    const classes = classMaker("BUI-Tab");
    return { classes };
  },
};
</script>
