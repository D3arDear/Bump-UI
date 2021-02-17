<template>
  <div class="switch">
    <h1>Collapse 组件</h1>
    <p>通过折叠面板收纳内容区域</p>
    <Demo :component="CollapseDemo1">
      <p>Collapse 的基本用法，可打开多个面板，各面板见互不影响</p>
    </Demo>
    <Demo :component="CollapseDemo2">
      <p>接收 single 属性，仅能同时展示一个面板</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import CollapseDemo1 from './Collapse.demo1.vue'
import CollapseDemo2 from './Collapse.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      CollapseDemo1,
      CollapseDemo2
    };
  },
}
</script>

<style lang="scss">
.switch {
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
