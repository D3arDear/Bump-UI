<template>
  <div class="toast">
    <h1>Toast 组件</h1>
    <Demo :component="ToastDemo1" defaultVisible>
      <p>Toast 的基本用法，可以通过 closeButton 传入关闭按钮的文字及关闭回调</p>
    </Demo>
    <AttrTable title="Toast Attributes" :sourceData="toastAttr" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import ToastDemo1 from './Toast.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {
    const toastAttr = [
      {
        id: 0,
        attr: 'autoClose',
        content: "是否开启自动关闭",
        type: 'boolean | number',
        option: "",
        default: 'false',
        required: 'false',
        description: 'number（单位：秒）, true (默认 3 秒)'
      },
      {
        id: 1,
        attr: 'closeButton',
        content: "关闭按钮文字及其回调",
        type: '{ text: string; callback: (context) => void }',
        option: "",
        default: '{ text: "关闭", callback: undefined}',
        required: 'false',
        description: ''
      },
      {
        id: 2,
        attr: 'enableHTML',
        content: "允许使用 HTML 作为内容，若开启则渲染插槽内的 HTML 内容",
        type: '{ text: string; callback: (context) => void }',
        option: "",
        default: '{ text: "关闭", callback: undefined}',
        required: 'false',
        description: ''
      },
      {
        id: 3,
        attr: 'position',
        content: "决定 toast 在视口的位置",
        type: 'string',
        option: '"top" / "bottom" / "middle"',
        default: '"top"',
        required: 'false',
        description: ''
      },
    ]

    return {
      toastAttr,
      ToastDemo1,
      AttrTable,
    };
  },
}
</script>

<style lang="scss">
.toast {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
