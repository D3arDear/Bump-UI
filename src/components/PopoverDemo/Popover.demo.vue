<template>
  <div class="popover">
    <h1>Popover 组件</h1>
    <Demo :component="PopoverDemo1" defaultVisible>
      <p>Popover 的基本用法</p>
    </Demo>
    <Demo :component="PopoverDemo2" defaultVisible>
      <p>Popover 接受 trigger 属性，决定弹出由 hover 控制还是由 click 控制</p>
    </Demo>
    <AttrTable title="Popover Attributes" :sourceData="popoverAttr" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import PopoverDemo1 from './Popover.demo1.vue'
import PopoverDemo2 from './Popover.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {

    const popoverAttr = [
      {
        id: 0,
        attr: 'popoverClassName',
        content: "自定义 popover 的 class 名",
        type: 'string',
        option: "",
        default: '',
        required: 'false',
        description: ''
      },
      {
        id: 1,
        attr: 'position',
        content: "决定 popover 从什么方向弹出",
        type: 'string',
        option: "'top' / 'bottom' / 'left' / 'right'",
        default: '"top"',
        required: 'false',
        description: ''
      },
      {
        id: 2,
        attr: 'trigger',
        content: "决定 popover 的触发方式",
        type: 'string',
        option: "'hover' / 'click'",
        default: '"click"',
        required: 'false',
        description: ''
      },
      {
        id: 3,
        attr: 'container',
        content: "决定 popover 挂载的容器元素",
        type: 'HTMLElement',
        option: "",
        default: '',
        required: 'false',
        description: '如果不填这个这个容器，那么 popover 就会挂载到 document.body 上'
      }
    ]


    return {
      PopoverDemo1,
      PopoverDemo2,
      popoverAttr,
      AttrTable
    };
  },
}
</script>

<style lang="scss">
.popover {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  .switchSection {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
