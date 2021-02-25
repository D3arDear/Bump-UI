<demo>
基本用法
</demo>
<template>
  <div class="table">
    <h1>Table 组件</h1>
    <Demo :component="TableDemo1">
      <p>Table 的基本用法 value 控制 Table 开关状态</p>
    </Demo>
    <Demo :component="TableDemo2">
      <p>Table 的基本用法 value 控制 Table 开关状态</p>
    </Demo>
    <AttrTable title="Table Attributes" :sourceData="tableAttr" />
    <AttrTable title="TableColumn Attributes" :sourceData="tableColAttr" />
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import TableDemo1 from './Table.demo1.vue'
import TableDemo2 from './Table.demo2.vue'
import AttrTable from '../AttrTable.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {
    const tableAttr = [
      {
        id: 0,
        attr: 'checkable',
        content: "是否提供选择框",
        type: 'boolean',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 1,
        attr: 'striped',
        content: "是否应用斑马纹样式",
        type: 'boolean',
        option: '',
        default: 'true',
        required: 'false',
        description: ''
      },
      {
        id: 2,
        attr: 'expendField',
        content: "指定源数据中可以展开显示的项(sourceData.someKeyUWannaExpend)",
        type: 'string',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 3,
        attr: 'height',
        content: "指定表格高度，滚动固定表头",
        type: 'number',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 4,
        attr: 'orderBy',
        content: "指定排序规则",
        type: '{[field:string]:string}',
        option: '',
        default: '{}',
        required: 'false',
        description: '例：{ score: "desc", rank: "desc" }'
      },
      {
        id: 5,
        attr: 'loading',
        content: "是否加载 loading 动画",
        type: 'boolean',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 6,
        attr: 'selectedItems',
        content: "在 checkable 为 true 时，选择的所有行",
        type: '{id: number | string}[]',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 7,
        attr: 'compact',
        content: "是否使用紧凑型样式",
        type: 'boolean',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 8,
        attr: 'dataSource',
        content: "源数据，其中必须含有 id 作为该项的唯一标识",
        type: '{id: number | string}[]',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 9,
        attr: 'numberVisible',
        content: "是否在行首显示编号",
        type: 'boolean',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 10,
        attr: 'bordered',
        content: "是否显示网格",
        type: 'boolean',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      },
      {
        id: 11,
        attr: 'v-slot:default',
        content: "默认插槽仅接受 TableColumn 组件",
        type: '',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
    ]

    const tableColAttr = [
      {
        id: 0,
        attr: 'text',
        content: "表头列名",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'field',
        content: "列属性名，获取源数据中 key 与其相同的项的值",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 2,
        attr: 'width',
        content: "定宽，单位（px）",
        type: 'number',
        option: '',
        default: '',
        required: 'true',
        description: ''
      }
    ]

    return {
      TableDemo2, TableDemo1,
      tableAttr, tableColAttr
    };
  },
}
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  .switchSection {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
}
</style>
