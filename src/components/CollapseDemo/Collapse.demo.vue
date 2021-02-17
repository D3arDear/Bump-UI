<template>
  <div class="switch">
    <h1>Collapse 组件</h1>
    <Demo :component="CollapseDemo1">
      <p>Collapse 的基本用法</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import CollapseDemo1 from './Collapse.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      CollapseDemo1,
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
