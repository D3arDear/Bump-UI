<template>
  <div class="Selector">
    <h1>Selector 组件</h1>
    <Demo :component="SelectorDemo1" defaultVisible>
      <p>Selector 的基本用法 value 控制 Switch 开关状态</p>
    </Demo>
    <AttrTable :sourceData="selectorAttr" title="Selector Attributes" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import SelectorDemo1 from './Selector.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {
    const selectorAttr = [
      {
        id: 0,
        attr: 'sourceData',
        content: "接受一个包含所有选项的数组",
        type: 'string[]',
        option: "",
        default: 'false',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'width',
        content: "接受一个宽度，确定 input 和弹出 selector 浮层的宽度",
        type: 'string',
        option: "",
        default: 'false',
        required: 'true',
        description: '建议使用 em 控制宽度'
      },
      {
        id: 2,
        attr: 'value',
        content: "selector 的绑定值",
        type: 'string',
        option: "",
        default: 'false',
        required: 'true',
        description: ''
      },
    ]
    return {
      selectorAttr,
      AttrTable,
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

