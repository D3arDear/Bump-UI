<template>
  <button :class="[classes('', '', flat ? 'flat' : ''), { checked: value }]">
    <span></span>
  </button>
</template>

<script lang="ts">
import { classMaker } from "../common/classMaker";
export default {
  name: "SwitchNormal",
  props: {
    value: Boolean,
    flat: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const classes = classMaker("BUI-Switch");
    return { classes };
  },
};
</script>

