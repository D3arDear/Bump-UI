<template>
  <div class="GridDemo">
    <h1>Grid 组件</h1>
    <Demo :component="GridDemo1">
      <p>Grid 的基本用法</p>
    </Demo>
    <Demo :component="GridDemo2">
      <p>设置 gutter 属性</p>
    </Demo>
    <Demo :component="GridDemo3">
      <p>offset设置空隙</p>
    </Demo>
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import GridDemo1 from './Grid.demo1.vue'
import GridDemo2 from './Grid.demo2.vue'
import GridDemo3 from './Grid.demo3.vue'
export default {
  name: "LayoutDemo",
  components: { Demo, GridDemo1, GridDemo2, GridDemo3 },
  setup() {
    return {
      GridDemo1,
      GridDemo2,
      GridDemo3
    };
  },
}
</script>

<style lang="scss">
.GridDemo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
