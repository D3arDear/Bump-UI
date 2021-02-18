<template>
  <div class="popover">
    <h1>Popover 组件</h1>
    <Demo :component="PopoverDemo1" defaultVisible>
      <p>Popover 的基本用法</p>
    </Demo>
    <Demo :component="PopoverDemo2" defaultVisible>
      <p>Popover 接受 trigger 属性，决定弹出由 hover 控制还是由 click 控制</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import PopoverDemo1 from './Popover.demo1.vue'
import PopoverDemo2 from './Popover.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      PopoverDemo1,
      PopoverDemo2
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
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
