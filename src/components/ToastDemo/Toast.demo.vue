<template>
  <div class="popover">
    <h1>Toast 组件</h1>
    <Demo :component="ToastDemo1" defaultVisible>
      <p>Toast 的基本用法，可以通过 closeButton 传入关闭按钮的文字及关闭回调</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import ToastDemo1 from './Toast.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      ToastDemo1,
    };
  },
}
</script>

<style lang="scss">
.popover {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  .switchSection {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
}
</style>
