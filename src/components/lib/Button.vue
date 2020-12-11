<template>
  <div class="ButtonCover">
    <button v-bind="rest" class="Button"><slot /></button>
    <div class="ButtonShadow-cover">
      <div class="ButtonShadow"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  name: "Button",
  setup(props, context) {
    const { size, level, ...rest } = context.attrs;
    return { size, level, rest };
  },
};
</script>

<style lang="scss" scoped>
.ButtonCover {
  position: relative;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .Button {
    width: 100px;
    height: 100%;
    padding: 10px;
    background: #f8f8f8;
    outline: none;
    border: none;
  }
  .ButtonShadow-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    filter: drop-shadow(4px 4px 3px rgba($color: #000000, $alpha: 0.2))
      drop-shadow(-2px -4px 3px rgba($color: rgb(255, 255, 255), $alpha: 0.8));
    .ButtonShadow {
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      clip-path: polygon(10% 20%, 100% 0, 100% 100%, 10% 80%);
      z-index: 2;
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
