<template>
  <button :class="{ checked: value, flat: flat }">
    <span></span>
  </button>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "SwitchNormal",
  props: {
    value: Boolean,
    flat: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/theme.scss";
$h: 22px;
$h2: $h - 4px;
$small-shadow: 2px 2px 6px
    rgba(
      $color: #000,
      $alpha: 0.3,
    ),
  -2px -2px 6px
    rgba(
      $color: #fff,
      $alpha: 0.7,
    );

$small-shadow-inset: 2px 2px 5px inset
    rgba(
      $color: #000,
      $alpha: 0.3,
    ),
  -2px -2px 5px inset
    rgba(
      $color: #fff,
      $alpha: 0.5,
    );

$tiny-shadow: -2px -2px 4px rgba(
      $color: #ffffff,
      $alpha: 0.6,
    ),
  2px 2px 4px
    rgba(
      $color: #000000,
      $alpha: 0.4,
    );

button {
  position: relative;
  height: $h;
  padding: 0;
  width: $h * 2;
  border: none;
  display: inline-flex;
  border-radius: $h/2;
  position: relative;
  z-index: -1;
  box-shadow: shadow-generator(topLeft, #f8f8f8, 6px, true),
    shadow-generator(topLeft, #f8f8f8, 6px, false);
  transition: background 250ms;
  @include surface(topLeft, #f8f8f8, concave);
  &:after {
    content: "";
    border-radius: $h/2;
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    transition: opacity 250ms;
    @include shadow(topLeft, #ff9e5d, 4px, true);
    @include surface(topLeft, #ff9e5d, concave);
  }
  &.checked {
    &:after {
      opacity: 1;
    }
    > span {
      left: calc(100% - #{$h2} - 2px);
    }
  }
  &.flat {
    @include shadow(topLeft, #f8f8f8, 4px, true);
  }
  &:focus {
    outline: none;
  }
  > span {
    position: absolute;
    z-index: 1;
    top: 2px;
    left: 2px;
    height: $h2;
    width: $h2;
    background: linear-gradient(145deg, #ffffff, #dfdfdf);
    border-radius: $h2/2;
    box-shadow: $tiny-shadow;
    transition: left 250ms;
  }
}
</style>
