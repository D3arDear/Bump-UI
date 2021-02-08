<template>
  <div class="buttonCover">
    <button v-bind="rest" class="BUI-Button" :class="themeClasses">
      <span><slot /></span>
    </button>
  </div>
</template>

<script lang="ts">
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
div.buttonCover {
  .BUI-Button {
    margin: 10px;
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
      @include shadow(topLeft, #f8f8f8, 12px, false);
    }
    &.body-concave {
      @include shadow(topLeft, #f8f8f8, 12px, true);
    }
    &.body-flat {
      box-shadow: none;
    }
    &.surface-flat {
      background: inherit;
    }
    &.surface-convex {
      @include surface(topLeft, #f8f8f8, convex);
      @include shadow(topLeft, #f8f8f8, 12px, false);
    }
    &.surface-concave {
      @include surface(topLeft, #f8f8f8, concave);
    }
    span {
      margin: auto;
    }
  }
}
</style>
