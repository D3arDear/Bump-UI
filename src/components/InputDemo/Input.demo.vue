<template>
  <div class="InputDemo">
    <h1>Input 组件</h1>
    <Demo :component="InputDemo1">
      <p>Input 的基本用法</p>
    </Demo>
    <Demo :component="InputDemo2">
      <p>双向绑定</p>
    </Demo>
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import InputDemo1 from './Input.demo1.vue'
import InputDemo2 from './Input.demo2.vue'
export default {
  name: "LayoutDemo",
  components: { Demo },
  setup() {
    return {
      InputDemo1,
      InputDemo2
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
