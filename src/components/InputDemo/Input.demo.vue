<template>
  <div class="InputDemo">
    <h1>Input 组件</h1>
    <Demo :component="InputDemo1">
      <p>Input 的基本用法</p>
    </Demo>
    <Demo :component="InputDemo2">
      <p>双向绑定</p>
    </Demo>
    <Demo :component="InputDemo3">
      <p>
        error 属性可以在输入框下显示相应错误信息，errorPosition
        接受两个位置"right"和"bottom"，决定错误信息的显示位置
      </p>
    </Demo>
    <Demo :component="InputDemo4">
      <p>Input 接受 standard 属性，应用规则样式</p>
    </Demo>
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import InputDemo1 from './Input.demo1.vue'
import InputDemo2 from './Input.demo2.vue'
import InputDemo3 from './Input.demo3.vue'
import InputDemo4 from './input.demo4.vue'
export default {
  name: "LayoutDemo",
  components: { Demo },
  setup() {
    return {
      InputDemo1,
      InputDemo2,
      InputDemo3,
      InputDemo4
    };
  },
}
</script>

<style lang="scss">
.InputDemo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
