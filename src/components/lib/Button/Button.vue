<template>
  <div class="buttonCover">
    <button v-bind="rest" class="Button" :class="surfaceTheme ">
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
  },
  setup(props, context) {
    const { surfaceTheme } = props;
    const { size, level, ...rest } = context.attrs;
    return { size, level, rest, surfaceTheme };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/theme.scss";
div.buttonCover {
  .Button {
    margin: 10px;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-self: center;
    @include shadow(topLeft, #f8f8f8, 12px, false);
    @include surface(topLeft, #f8f8f8, concave);
    &.convex {
      @include surface(topLeft, #f8f8f8, convex);
    }
    span {
      margin: auto;
    }
  }
}
</style>
