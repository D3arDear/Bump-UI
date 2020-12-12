<template>
  <button @click="toggle" class="SwitchCover">
    <div class="Switch" :class="{ checked: value }">
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
    toggle: {
      type: Function,
    },
  },
  setup(props, context) {
    const toggle = () => {
      console.log("内部点击了");
    };
    return { toggle };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/theme.scss";
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
  z-index: -2;
  @include shadow(topLeft, #f8f8f8, 6px, false);
  border-radius: $h/4;
  .Switch {
    position: absolute;
    inset: $gap;
    width: 2 * ($h2 + $gap);
    outline: none;
    border: none;
    @include surface(topRight, #f8f8f8, convex);
    border-radius: $h2/4;
    padding: 0;
    transition: all 250ms;
    .SwitchHandle {
      position: absolute;
      top: $h2/2 - $h2/4;
      right: 2 * $gap/3;
      height: $h2/2;
      width: $gap/2;
      border-radius: $gap/2;
      background: #ddd;
    }
    &.checked {
      @include surface(topLeft, #ff7e32, convex);
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
