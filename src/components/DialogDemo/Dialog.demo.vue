<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <Demo :component="DialogDemo1">
        <p>
          Dialog 组件的基本用法通过具名插槽传入内容 v-slot:title
          传入标题，v-slot:content 传入内容，提供 ok 和 cancel
          回调在确认和取消触发时调用。 closeOnClickOverylay
          控制点击浮层是否能关闭对话框
        </p>
      </Demo>
      <Demo :component="DialogDemo2">
        <p>调用 openDialog 函数，构造并挂载 Dialog 组件</p>
      </Demo>
    </div>
  </div>
</template>

<script lang="ts">
import Demo from '../Demo.vue'
import DialogDemo1 from './Dialog.demo1.vue'
import DialogDemo2 from './Dialog.demo2.vue'
export default {
  name: "DialogDemo",
  components: {
    Demo
  },
  setup() {
    return {
      DialogDemo1,
      DialogDemo2
    };
  },
};
</script>

<style lang="scss">
.dialog-demo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .button {
        margin: 5px;
      }
    }
  }
}
</style>
