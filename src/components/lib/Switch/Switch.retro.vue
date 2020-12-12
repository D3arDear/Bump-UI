<template>
  <div class="SwitchCover">
    <button @click="toggle" class="Switch" :class="{ checked: value }"></button>
    <div class="SwitchShadow-cover">
      <div class="SwitchShadow"></div>
    </div>
  </div>
  这里是retro
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
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/theme.scss";
$h: 22px;
$gap: 4px;
$h2: $h - 2 * $gap;

.SwitchCover {
  position: relative;
  width: $h * 2;
  height: $h;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  z-index: -2;
  @include shadow(topLeft, #f8f8f8, 6px, true);
  border-radius: $h/4;
  .Switch {
    border: 1px solid black;
    width: $h2 * 2 + $gap;
    height: $h2;
    outline: none;
    border: none;
    @include surface(topRight, #f8f8f8, convex);
    border-radius: $h2/4;
    padding: 0;
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
