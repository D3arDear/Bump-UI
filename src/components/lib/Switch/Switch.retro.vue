<template>
  <button class="SwitchCover" :class="{ checked: value }">
    <div class="Switch">
      <div class="SwitchHandle"></div>
    </div>
    <div class="SwitchShadow-cover">
      <div class="SwitchShadow"></div>
    </div>
  </button>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "SwitchRetro",
  props: {
    value: Boolean,
  },
  setup(props, context) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../style/theme.scss";
$h: 22px;
$gap: 2px;
$h2: $h - 2 * $gap;

.SwitchCover {
  position: relative;
  min-width: $h * 2;
  min-height: $h;
  padding: $gap;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  padding: 0;
  z-index: -1;
  border-radius: $h/4;
  border: 0;
  cursor: pointer;
  @include surface(topLeft, #f8f8f8, convex);
  @include shadow(topLeft, #f8f8f8, 6px, false);
  transition: all 250ms;
  cursor: pointer;
  &:after {
    content: "";
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: $h/4;
    @include surface(topLeft, #ff9e5d, convex);
    transition: all 250ms;
  }
  .Switch {
    position: absolute;
    z-index: 1;
    inset: $gap;
    width: 2 * ($h2 + $gap);
    outline: none;
    border: none;
    @include surface(topRight, #fff, convex);
    border-radius: $h2/4;
    padding: 0;
    transition: all 250ms;
    &:after {
      content: "";
      position: absolute;
      opacity: 0;
      inset: 0;
      width: 2 * ($h2 + $gap);
      border-radius: $h2/4;
      @include surface(bottomRight, #ddd, convex);
      transition: all 250ms;
    }
    .SwitchHandle {
      position: absolute;
      top: $h2/2 - $h2/4;
      right: 2 * $gap/3;
      height: $h2/2;
      width: $gap/2;
      border-radius: $gap/2;
      background: #ddd;
      transition: all 250ms;
    }
  }
  &.checked {
    &:after {
      opacity: 1;
    }
    .Switch {
      &:after {
        opacity: 1;
      }
      .SwitchHandle {
        z-index: 2;
        background: #ff9e5d;
      }
    }
  }
  .SwitchShadow-cover {
    position: absolute;
    inset: $gap;
    z-index: -1;
    filter: drop-shadow(4px 4px 3px rgba($color: #000000, $alpha: 0.2))
      drop-shadow(-2px -4px 3px rgba($color: rgb(255, 255, 255), $alpha: 0.8));
    .SwitchShadow {
      z-index: -1;
      position: absolute;
      inset: $gap;
      clip-path: polygon(10% 20%, 100% 0, 100% 100%, 10% 80%);
      z-index: 2;
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
