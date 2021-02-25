<template>
  <div class="switch">
    <h1>Collapse 组件</h1>
    <p>通过折叠面板收纳内容区域</p>
    <Demo :component="CollapseDemo1">
      <p>Collapse 的基本用法，可打开多个面板，各面板见互不影响</p>
    </Demo>
    <Demo :component="CollapseDemo2">
      <p>接收 single 属性，仅能同时展示一个面板</p>
    </Demo>
    <AttrTable title="Collapse Attributes" :sourceData="collapseAttr" />
    <AttrTable
      title="Collapse-item Attributes"
      :sourceData="collapseItemAttr"
    />
  </div>
</template>

<script lang="ts">
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import CollapseDemo1 from './Collapse.demo1.vue'
import CollapseDemo2 from './Collapse.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {
    const collapseAttr = [
      {
        id: 0,
        attr: 'selected',
        content: "collapse 的绑定值 决定显示的 CollapseItem",
        type: 'string[]',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'single',
        content: "是否同一时间仅显示一项 collapseItem",
        type: 'boolean',
        option: '',
        default: 'false',
        required: 'false',
        description: ''
      }
    ]

    const collapseItemAttr = [
      {
        id: 0,
        attr: 'title',
        content: "tab 的标题名",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'name',
        content: "tab 的 name，父组件依该值决定是否开启",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 2,
        attr: 'v-slot:default',
        content: "默认插槽为 tab 的内容部分",
        type: '',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
    ]
    return {
      CollapseDemo1,
      CollapseDemo2,
      collapseItemAttr, collapseAttr
    };
  },
}
</script>

<style lang="scss">
h1 {
  margin-bottom: 10px;
}
.switch {
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
