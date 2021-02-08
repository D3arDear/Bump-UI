<template>
  <button v-bind="rest" class="BUI-Button" :class="themeClasses">
    <span><slot /></span>
  </button>
</template>

<script lang="ts">
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
  },
  setup(props, context) {
    const { surfaceTheme, bodyTheme } = props;
    const { size, level, ...rest } = context.attrs;
    const themeClasses = `surface-${surfaceTheme} body-${bodyTheme}`;

    return { size, level, rest, themeClasses };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/theme.scss";
.BUI-Button {
  padding: 0 1em;
  height: 2.5em;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-self: center;
  outline: 0px;
  cursor: pointer;
  &.body-convex {
    @include shadow($light-direction, $color, $blur-range, false);
  }
  &.body-concave {
    @include shadow($light-direction, $color, $blur-range, true);
  }
  &.body-flat {
    box-shadow: none;
  }
  &.surface-flat {
    background: inherit;
  }
  &.surface-convex {
    @include surface($light-direction, $color, convex);
    @include shadow($light-direction, $color, $blur-range, false);
  }
  &.surface-concave {
    @include surface($light-direction, $color, concave);
  }
  span {
    margin: auto;
  }
}
</style>
