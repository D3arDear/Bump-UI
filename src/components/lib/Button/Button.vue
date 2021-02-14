<template>
  <button
    v-bind="rest"
    v-on="{
      mousedown: mouseDown,
      mouseup: mouseUp,
      touchstart: mouseDown,
      touchend: mouseUp,
    }"
    :class="[
      pressed && classes(buttonTheme, '', 'clickDown'),
      classes(buttonTheme, '', parsedLevel),
      { rounded: rounded },
      size && classes(buttonTheme, '', size),
      themeClasses,
    ]"
  >
    <span v-if="loading" :class="classes(buttonTheme, 'loadingIndicator', '')">
      <span :class="classes(buttonTheme, 'loadingIndicator-space', '')"></span>
    </span>
    <span :class="classes(buttonTheme, 'content', '')"><slot /></span>
  </button>
</template>


<script lang="ts">
import { ref } from "vue";
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const levelList = ["primary", "success", "info", "warning", "danger"];
    const pressed = ref(false);

    const { surfaceStyle, bodyStyle, rounded, textButton, loading } = props;
    const { size, level, ...rest } = context.attrs;

    const themeClasses = `surface-${surfaceStyle} body-${bodyStyle}`;
    const classes = classMaker("BUI-Button");
    const parsedLevel = levelList.indexOf(level as string) < 0 ? "" : level;
    const buttonTheme = textButton ? "Text" : "Neo";

    const mouseDown = () => {
      pressed.value = true;
    };
    const mouseUp = () => {
      pressed.value = false;
    };

    return {
      size,
      level,
      rest,
      themeClasses,
      rounded,
      classes,
      parsedLevel,
      buttonTheme,
      pressed,
      mouseUp,
      mouseDown,
      loading,
    };
  },
};
</script>

<style lang="scss">
@import "./Button.scss";
</style>
