<template>
  <div class="popover">
    <h1>Popover 组件</h1>
    <Demo :component="ToastDemo1">
      <p>Popover 的基本用法</p>
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
