<template>
  <div class="cascader-demo">
    <h1>Cascader 组件</h1>
    <Demo :component="CascaderDemo1">
      <p>这是 Cascader 功能</p>
    </Demo>

    <a class="toDb" href="/db.js">本例中使用的 db.js</a>

    <AttrTable title="Cascader Attributes" :sourceData="cascaderAttr" />
  </div>
</template>

<script lang="ts">
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import CascaderDemo1 from "./Cascader.demo1.vue";
import Button from '../../lib/Button/Button.vue'
export default {
  name: "ButtonDemo",
  components: { Demo, AttrTable, Button },
  setup() {
    const cascaderAttr = [
      {
        id: 0,
        attr: 'source',
        content: "源数据，类型较为复杂",
        type: '{id: string | number; isLeaf: boolean; name: number | string}[]',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'popoverHeight',
        content: "弹出框的高度",
        type: 'string',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 2,
        attr: 'inputLabel',
        content: "cascader 中输入框的占位标签",
        type: 'string',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 3,
        attr: 'selected',
        content: "选择的从高等级到低等级的所有数据",
        type: '{name:string}[]',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 4,
        attr: 'loadData',
        content: "请求下一级数据的回调",
        type: '(item: {id:string|number}, callback: (nextLevelSource: sourceDataType) => void) => void',
        option: '',
        default: '',
        required: 'false',
        description: ''
      },
    ]
    return {
      CascaderDemo1, cascaderAttr
    };
  },
};
</script>

<style lang="scss" scoped>
.cascader-demo {
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
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .button {
        margin: 5px 0;
      }
    }
  }
}
.toDb {
  font-size: 16px;
  margin: 40px 0 20px 0;
  color: #ff9e5d;
}
</style>
