<template>
  <div class="Selector">
    <h1>Selector 组件</h1>
    <Demo :component="SelectorDemo1" defaultVisible>
      <p>Selector 的基本用法 value 控制 Switch 开关状态</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import SelectorDemo1 from './Selector.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      SelectorDemo1,
    };
  },
}
</script>

<style lang="scss">
.Selector {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>

