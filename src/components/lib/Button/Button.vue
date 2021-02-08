<template>
  <button
    v-bind="rest"
    :class="classes('', '', parsedLevel)"
    :class="themeClasses"
    :class="rounded && 'rounded'"
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
      default: "concave",
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

<style lang="scss" scoped>
@import "../../../style/theme.scss";
@mixin BUI-Button {
}
@mixin BUI-ButtonTheme($color) {
  &.body-convex {
    @include shadow($light-direction, $--color--background, $blur-range, false);
  }
  &.body-concave {
    @include shadow($light-direction, $--color--background, $blur-range, true);
  }
  &.body-flat {
    box-shadow: none;
  }
  &.surface-flat {
    background: $color;
  }
  &.surface-convex {
    @include surface($light-direction, $color, convex);
    @include shadow($light-direction, $--color--background, $blur-range, false);
  }
  &.surface-concave {
    @include surface($light-direction, $color, concave);
  }
}
.BUI-Button {
  padding: 0 1em;
  height: 3em;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-self: center;
  outline: 0px;
  cursor: pointer;
  @include BUI-ButtonTheme($--color--primary);
  &.rounded {
    height: 3em;
    min-width: 3em;
    padding: 0 1em;
    border-radius: 1.5em;
  }
  &--primary {
    @extend .BUI-Button;
    @include BUI-ButtonTheme($--color--primary);
  }
  &--success {
    @extend .BUI-Button;
    @include BUI-ButtonTheme($--color--success);
  }
  &--info {
    @extend .BUI-Button;
    @include BUI-ButtonTheme($--color--info);
  }
  &--warning {
    @extend .BUI-Button;
    @include BUI-ButtonTheme($--color--warning);
  }
  &--danger {
    @extend .BUI-Button;
    @include BUI-ButtonTheme($--color--danger);
  }
  span {
    margin: auto;
  }
}
</style>
