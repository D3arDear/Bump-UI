<template>
  <div class="waterfall">
    <h1>WaterFall 组件</h1>
    <Demo :component="WaterfallDemo1">
      <p>瀑布流布局的基本用法</p>
    </Demo>
    <AttrTable :sourceData="waterfallData" title="Waterfall Attributes" />
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import AttrTable from '../AttrTable.vue';
import WaterfallDemo1 from './Waterfall.demo1.vue'
import WaterfallDemo2 from './Waterfall.demo2.vue'
// @ts-ignore
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    const waterfallData = [
      {
        attr: 'width',
        content: '决定瀑布流每个单元的宽度',
        type: 'number',
        option: "",
        default: '200',
        required: 'true',
      },
      {
        id: 1,
        attr: 'sourceData',
        content: '含有每个单元的数据的数组，会以 slotProps 传回给插槽',
        type: 'any[]',
        option: "",
        default: '',
        required: 'true',
        description: `<template v-slot="slotProps"> {{slotProps.props}} </template>`
      },
      {
        id: 2,
        attr: 'container',
        content: '指定瀑布流组件的容器',
        type: 'HTMLDivElement',
        option: "",
        default: '',
        required: 'optional',
        description: '如果 container 和 containerId 都无法确定容器，容器就会选择 document 或 body'
      },
      {
        id: 3,
        attr: 'containerId',
        content: '指定瀑布流组件的容器的 id，组件会根据 id 查找容器',
        type: 'string',
        option: "",
        default: '',
        required: 'optional',
        description: '如果 container 和 containerId 都无法确定容器，容器就会选择 document 或 body'
      },
      {
        id: 4,
        attr: 'scroll-to-bottom',
        content: '滚动到底部事件，可在父组件监听该事件以更新数据',
        type: 'event',
        option: "",
        default: '',
        required: '',
        description: '@scroll-to-bottom="loadNewData"'
      },
    ]

    return {
      WaterfallDemo1,
      WaterfallDemo2,
      AttrTable,
      waterfallData
    };
  },
}
</script>

<style lang="scss">
.waterfall {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
