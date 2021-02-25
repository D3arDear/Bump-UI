<template>
  <button :class="[classes('Retro', '', ''), { checked: value }]">
    <div :class="[classes('Retro', 'handle', '')]">
      <div :class="[classes('Retro', 'handle-item', '')]"></div>
    </div>
    <div :class="classes('Retro', 'shadow-cover', '')">
      <div :class="classes('Retro', 'shadow', '')"></div>
    </div>
  </button>
</template>

<script lang="ts">
import { classMaker } from "../common/classMaker";
export default {
  name: "SwitchRetro",
  props: {
    value: Boolean,
  },
  setup(props, context) {
    const classes = classMaker("BUI-Switch");
    return { classes };
  },
};
</script>

