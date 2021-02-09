<template>
  <button
    v-bind="rest"
    :class="[
      classes(buttonTheme, '', parsedLevel),
      { rounded: rounded },
      size && classes(buttonTheme, '', size),
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
    surfaceStyle: {
      type: String,
      default: "flat",
    },
    bodyStyle: {
      type: String,
      default: "convex",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    textButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const levelList = ["primary", "success", "info", "warning", "danger"];
    const { surfaceStyle, bodyStyle, rounded, textButton } = props;
    const { size, level, ...rest } = context.attrs;

    const themeClasses = `surface-${surfaceStyle} body-${bodyStyle}`;
    console.log(themeClasses);
    const classes = classMaker("BUI-Button");
    const parsedLevel = levelList.indexOf(level as string) < 0 ? "" : level;
    const buttonTheme = textButton ? "Text" : "Neo";

    return {
      size,
      level,
      rest,
      themeClasses,
      rounded,
      classes,
      parsedLevel,
      buttonTheme,
    };
  },
};
</script>

<style lang="scss">
@import "./Button.scss";
</style>
