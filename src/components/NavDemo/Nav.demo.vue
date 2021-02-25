<template>
  <div class="Nav">
    <h1>Nav 组件</h1>
    <Demo :component="NavDemo1" defaultVisible>
      <p>Nav 基本用法</p>
    </Demo>
    <Demo :component="NavDemo2" defaultVisible>
      <p>接受 vertical 属性，显示垂直样式。</p>
    </Demo>
    <AttrTable title="Nav Attributes" :sourceData="navAttr" />
    <AttrTable title="NavItem Attributes" :sourceData="navItemAttr" />
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import AttrTable from '../AttrTable.vue';
import NavDemo1 from './Nav.demo1.vue'
import NavDemo2 from './Nav.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    const navAttr = [
      {
        id: 0,
        attr: 'selected',
        content: "Nav 的展开项 Nav-item 的 name 值",
        type: 'string',
        option: "",
        default: '""',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'vertical',
        content: "决定是否使用垂直样式",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'false',
        description: ''
      },
    ]

    const navItemAttr = [
      {
        id: 0,
        attr: 'name',
        content: "Nav 子项 key 值，当子项被选中时更新父组件 selected",
        type: 'string',
        option: "",
        default: '',
        required: 'true',
        description: ''
      },
    ]
    return {
      navItemAttr,
      navAttr,
      AttrTable,
      NavDemo1,
      NavDemo2
    };
  },
}
</script>

<style lang="scss">
.Nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
