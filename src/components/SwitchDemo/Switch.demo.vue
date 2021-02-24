<template>
  <div class="switch">
    <h1>Switch 组件</h1>
    <Demo :component="SwitchDemo1" defaultVisible>
      <p>Switch 的基本用法 value 控制 Switch 开关状态</p>
    </Demo>
    <Demo :component="SwitchDemo2" defaultVisible>
      <p>接受 flat 属性，应用扁平样式</p>
    </Demo>
    <Demo :component="SwitchDemo3" defaultVisible>
      <p>接受 retro 属性，应用复古样式</p>
    </Demo>
    <AttrTable :sourceData="switchAttr" title="Switch Attributes" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import SwitchDemo1 from './Switch.demo1.vue'
// @ts-ignore
import SwitchDemo2 from './Switch.demo2.vue'
import SwitchDemo3 from './Switch.demo3.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {
    const switchAttr = [
      {
        id: 0,
        attr: 'value',
        content: '开关绑定值',
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'true',
        description: ''
      },
      {
        id: 0,
        attr: 'flat',
        content: '应用开关扁平样式',
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'optional',
        description: ''
      },
      {
        id: 0,
        attr: 'retro',
        content: '应用开关复古样式',
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'optional',
        description: ''
      },
    ]

    return {
      SwitchDemo1,
      SwitchDemo2,
      SwitchDemo3,
      AttrTable,
      switchAttr
    };
  },
}
</script>

<style lang="scss">
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
