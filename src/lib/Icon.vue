<template>
  <svg :class="classes('', '', '')">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script lang="ts">
import "./svg.js";
import { classMaker } from './common/classMaker'
// import { defineProps } from "vue";
export default {
  name: "BUI-Icon",
  props: {
    name: String
  },
  setup() {
    const classes = classMaker('BUI-Icon')
    return {
      classes
    }
  }
}
</script>

<style lang="scss">
.BUI-Icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
