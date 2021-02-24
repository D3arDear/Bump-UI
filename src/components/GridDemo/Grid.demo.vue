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
    <AttrTable :sourceData="colData" title="Col Attributes" />
    <AttrTable :sourceData="rowData" title="Row Attributes" />
  </div>
</template>

<script lang="ts">
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import GridDemo1 from './Grid.demo1.vue'
import GridDemo2 from './Grid.demo2.vue'
import GridDemo3 from './Grid.demo3.vue'
export default {
  name: "LayoutDemo",
  components: { Demo, GridDemo1, GridDemo2, GridDemo3, AttrTable },
  setup() {
    const colData = [
      {
        attr: 'span',
        content: '24/span 决定宽度',
        type: 'number / string',
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        attr: 'offset',
        content: '决定当前 col 之前空出多大的距离',
        type: 'number / string',
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        attr: 'pad',
        content: '传入 pad 的 span 和 offset 以满足自适应',
        type: '{span: string, offset: string}',
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        attr: 'pc',
        content: '传入 pc 的 span 和 offset 以满足自适应',
        type: '{span: string, offset: string}',
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        attr: 'narrowPc',
        content: '传入窄屏 pc 的 span 和 offset 以满足自适应',
        type: `{span: string, offset: string}`,
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        attr: 'widePc',
        content: '传入宽屏 pc 的 span 和 offset 以满足自适应',
        type: '{span: string, offset: string}',
        option: "",
        default: '',
        required: 'false',
        description: ''
      }
    ]

    const rowData = [
      {
        attr: 'gutter',
        content: '设置间距',
        type: 'number / string',
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        attr: 'align',
        content: '决定对齐方向',
        type: 'string',
        option: `"left" / "right" / "center"`,
        default: '',
        required: 'false',
        description: ''
      },
    ]

    return {
      GridDemo1,
      GridDemo2,
      GridDemo3,
      colData, rowData
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
