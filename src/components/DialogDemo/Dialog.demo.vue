<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <Demo :component="DialogDemo1">
        <p>
          Dialog 组件的基本用法通过具名插槽传入内容 v-slot:title
          传入标题，v-slot:content 传入内容，提供 ok 和 cancel
          回调在确认和取消触发时调用。 closeOnClickOverylay
          控制点击浮层是否能关闭对话框
        </p>
      </Demo>
      <Demo :component="DialogDemo2">
        <p>调用 openDialog 函数，构造并挂载 Dialog 组件</p>
      </Demo>
      <AttrTable title="Dialog Attributes" :sourceData="dialogAttr" />
    </div>
  </div>
</template>

<script lang="ts">
import AttrTable from '../AttrTable.vue';
import Demo from '../Demo.vue'
import DialogDemo1 from './Dialog.demo1.vue'
import DialogDemo2 from './Dialog.demo2.vue'
export default {
  name: "DialogDemo",
  components: {
    Demo,
    AttrTable
  },
  setup() {
    const dialogAttr = [
      {
        id: 0,
        attr: 'title',
        content: "dialog 的标题",
        type: 'string',
        option: "",
        default: '"提示"',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'visible',
        content: "dialog 的绑定值，决定 dialog 是否开启",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'true',
        description: ''
      },
      {
        id: 2,
        attr: 'closeOnClickOverlay',
        content: "决定是否点击浮层关闭 dialog",
        type: 'boolean',
        option: "",
        default: 'false',
        required: 'true',
        description: ''
      },
      {
        id: 3,
        attr: 'ok',
        content: "text 决定按钮内容，callback 传入点击 确认键 后执行回调",
        type: '{text: string; callback: ()=> void | false | true;}',
        option: "",
        default: '{text: ok, callback: undefined}',
        required: 'false',
        description: '如果函数有返回值且返回值为 false ，那么不会关闭 dialog'
      },
      {
        id: 4,
        attr: 'cancel',
        content: "text 决定按钮内容，callback 传入点击 取消键 后执行回调",
        type: '{text: string; callback: ()=> void | false | true;}',
        option: "",
        default: '{text: cancel, callback: undefined}',
        required: 'false',
        description: ''
      }
    ]
    return {
      DialogDemo1,
      DialogDemo2,
      dialogAttr
    };
  },
};
</script>

<style lang="scss">
.dialog-demo {
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
      .button {
        margin: 5px;
      }
    }
  }
}
</style>
