<template>
  <button
    v-bind="rest"
    :class="[
      classes('', '', parsedLevel),
      { rounded: rounded },
      size && classes('', '', size),
      themeClasses,
    ]"
  >
    <span><slot /></span>
  </button>
</template>


<script lang="ts">
import { classMaker } from "../common/classMaker";

export default {
  inheritAttrs: false,
  name: "Button",
  props: {
    surfaceTheme: {
      type: String,
      default: "flat",
    },
    bodyTheme: {
      type: String,
      default: "convex",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const levelList = ["primary", "success", "info", "warning", "danger"];
    const { surfaceTheme, bodyTheme, rounded } = props;
    const { size, level, ...rest } = context.attrs;

    const themeClasses = `surface-${surfaceTheme} body-${bodyTheme}`;
    const classes = classMaker("BUI-Button");
    const parsedLevel = levelList.indexOf(level as string) < 0 ? "" : level;

    return { size, level, rest, themeClasses, rounded, classes, parsedLevel };
  },
};
</script>

<style lang="scss">
@import "./Button.scss";
</style>
