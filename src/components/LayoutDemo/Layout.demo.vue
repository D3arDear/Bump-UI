<template>
  <div class="LayoutDemo">
    <h1>Layout 组件</h1>
    <Demo :component="LayoutDemo1">
      <p>Layout 的基本用法</p>
    </Demo>
    <Demo :component="LayoutDemo2">
      <p></p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import LayoutDemo1 from './Layout.demo1.vue'
import LayoutDemo2 from './Layout.demo2.vue'
export default {
  name: "LayoutDemo",
  components: { Demo },
  setup() {
    return {
      LayoutDemo1,
      LayoutDemo2
    };
  },
}
</script>

<style lang="scss">
.LayoutDemo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
