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
    <span :class="classes(buttonTheme, 'content', '')">
      <template v-if="icon">
        <template v-if="icon.right !== true">
          <Icon :name="icon.name" />
          <div
            :class="`parting${size ? '--' + size : ''}`"
            v-if="(icon && singleIcon) || buttonTheme === 'Text'"
          ></div>
        </template>
        <slot />
        <template v-if="icon.right === true">
          <div
            :class="`parting${size ? '--' + size : ''}`"
            v-if="(icon && singleIcon) || buttonTheme !== 'Text'"
          ></div>
          <Icon :name="icon.name" />
        </template>
      </template>
      <template v-else>
        <slot />
      </template>
    </span>
  </button>
  <!-- ... -->
</template>


<script lang="ts">
import Icon from '../Icon.vue'
import { computed, PropType, ref } from "vue";
import { classMaker } from "../common/classMaker";
import { hex2rgb, rgb2hsl } from "../common/colorSwitch";
interface ILinearColor {
  colors: string[];
  angle: number;
}
interface IIcon {
  name: string;
  right: boolean;
}

export default {
  inheritAttrs: false,
  name: "BUI-Button",
  components: {
    Icon
  },
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
    icon: {
      type: Object as PropType<IIcon>,
      require: false,
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

    const themeClasses = computed(() => `surface-${surfaceStyle} body-${bodyStyle}`);
    const classes = classMaker("BUI-Button");
    const parsedLevel = computed(() => levelList.indexOf(level as string) < 0 ? "" : level)
    const buttonTheme = computed(() => textButton ? "Text" : "Neo")

    const singleIcon = computed(() => {
      return context.slots.default
    })

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
      context,
      singleIcon
    };
  },
};
</script>

<style lang="scss">
@import "./Button.scss";
</style>
