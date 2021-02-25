<template>
  <div class="Tabs-demo">
    <h1>Tabs 组件</h1>
    <div class="Tabs-demo__section">
      <Demo :component="TabsDemo1">
        <p>
          Tabs 的基本用法，以 selected === title 的布尔值控制显示哪一个
          Tab。slot 仅接受 Tab 组件为子组件
        </p>
      </Demo>
      <Demo :component="TabsDemo2">
        <p>Tab 组件接受 disabled 属性，使该 Tab 不可选</p>
      </Demo>
      <AttrTable title="Tabs Attributes" :sourceData="tabsAttr" />
      <AttrTable title="Tab Attributes" :sourceData="tabAttr" />
    </div>
  </div>
</template>

<script lang='ts'>
import AttrTable from '../AttrTable.vue';

import Demo from '../Demo.vue'
import TabsDemo1 from './Tabs.demo1.vue'
import TabsDemo2 from './Tabs.demo2.vue'

export default {
  name: "TabsDemo",
  components: {
    Demo,
    AttrTable
  },
  setup() {
    const tabsAttr = [
      {
        id: 0,
        attr: 'selected',
        content: "Tabs 的绑定值，决定子组件的 tab 的显示",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      }
    ]
    const tabAttr = [
      {
        id: 1,
        attr: 'title',
        content: 'Tab 的对应的 title，父组件以该值判断是否该子组件被选中',
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      }
    ]

    return {
      TabsDemo1,
      TabsDemo2,
      tabsAttr,
      tabAttr
    }
  }
};
</script>

<style lang="scss" scope>
.Tabs-demo {
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
      width: 100%;
    }
  }
}
</style>
