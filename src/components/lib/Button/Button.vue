<template>
  <button
    v-on="{
      mousedown: mouseDown,
      mouseup: mouseUp,
      mouseleave: mouseUp,
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
    :style="linearColor && linearBG"
    v-bind="rest"
  >
    <span v-if="loading" :class="classes(buttonTheme, 'loadingIndicator', '')">
      <span :class="classes(buttonTheme, 'loadingIndicator-space', '')"></span>
    </span>
    <span :class="classes(buttonTheme, 'content', '')"><slot /></span>
  </button>
</template>


<script lang="ts">
import { computed, PropType, ref } from "vue";
import { classMaker } from "../common/classMaker";
import { hex2rgb, rgb2hsl } from "../common/colorSwitch";
interface ILinearColor {
  colors: string[];
  angle: number;
}

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
    linearColor: {
      type: Object as PropType<ILinearColor>,
      required: false,
    },
  },
  setup(props, context) {
    const levelList = ["primary", "success", "info", "warning", "danger"];
    const pressed = ref(false);

    const {
      surfaceStyle,
      bodyStyle,
      rounded,
      textButton,
      loading,
      linearColor,
    } = props;
    const { size, level, ...rest } = context.attrs;

    const themeClasses = `surface-${surfaceStyle} body-${bodyStyle}`;
    const classes = classMaker("BUI-Button");
    const parsedLevel = levelList.indexOf(level as string) < 0 ? "" : level;
    const buttonTheme = textButton ? "Text" : "Neo";

    const colorHsl = (color) => {
      if (linearColor) {
        const regex = new RegExp(/^#/);
        return regex.test(color) ? rgb2hsl(hex2rgb(color)) : rgb2hsl(color);
      }
      return;
    };
    const textColor = (color1, color2) => {
      if (linearColor) {
        return (colorHsl(color1).l < 50 && colorHsl(color2).l < 50) ||
          colorHsl(color1).s > 50 ||
          colorHsl(color2).s > 50
          ? "#eee"
          : "#292929";
      }
      return;
    };
    const linearBG = computed(() => {
      if (linearColor) {
        const color1 = linearColor.colors[0];
        const color2 = linearColor.colors[1];
        return {
          background: `linear-gradient(${linearColor.angle}deg, ${color1} 30%, ${color2} 90%)`,
          color: textColor(color1, color2),
        };
      }
      return;
    });

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
      linearBG,
    };
  },
};
</script>

<style lang="scss">
@import "./Button.scss";
</style>
