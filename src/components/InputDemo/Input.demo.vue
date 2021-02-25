<template>
  <div class="InputDemo">
    <h1>Input 组件</h1>
    <Demo :component="InputDemo1">
      <p>Input 的基本用法 value 属性双向绑定</p>
    </Demo>
    <Demo :component="InputDemo2">
      <p>接受 label 属性，会对 Input 的样式有较大的改变</p>
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
    <AttrTable title="Input Attributes" :sourceData="inputAttr" />
  </div>
</template>

<script lang="ts">
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import InputDemo1 from './Input.demo1.vue'
import InputDemo2 from './Input.demo2.vue'
import InputDemo3 from './Input.demo3.vue'
import InputDemo4 from './input.demo4.vue'
export default {
  name: "LayoutDemo",
  components: { Demo, AttrTable },
  setup() {
    const inputAttr = [
      {
        id: 0,
        attr: 'value',
        content: "input 的绑定值",
        type: 'string / Date',
        option: "",
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'label',
        content: "input 的 label 名",
        type: 'string',
        option: "",
        default: '',
        required: 'false',
        description: '加入 label 会对样式有较大改变'
      },
      {
        id: 2,
        attr: 'focused',
        content: "决定 input 是否保持 focus 状态",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 3,
        attr: 'standard',
        content: "决定是否使用 standard 样式",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 4,
        attr: 'disabled',
        content: "不可用状态",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 5,
        attr: 'readonly',
        content: "只读状态",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'false',
        description: '只读状态依旧可以 focus'
      },
      {
        id: 6,
        attr: 'error',
        content: "错误信息",
        type: 'string',
        option: "",
        default: '',
        required: '',
        description: ''
      },
      {
        id: 7,
        attr: 'errorPosition',
        content: "错误信息位置",
        type: 'string',
        option: "right / bottom",
        default: '',
        required: '',
        description: ''
      },
    ]

    return {
      inputAttr,
      AttrTable,
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
