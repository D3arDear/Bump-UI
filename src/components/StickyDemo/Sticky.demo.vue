<template>
  <div class="sticky">
    <h1>Sticky 组件</h1>
    <Demo :component="StickyDemo1" defaultVisible>
      <p>distance 可以控制粘连内容距视口顶端多少距离</p>
    </Demo>
    <AttrTable title="Sticky Attributes" :sourceData="stickyAttributes" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import StickyDemo1 from './Sticky.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {

    const stickyAttributes = [
      {
        id: 0,
        attr: 'distance',
        content: "粘连组件距视口顶部的距离",
        type: 'number',
        option: '',
        default: '0',
        required: 'false',
        description: ''
      }
    ]
    return {
      StickyDemo1,
      stickyAttributes,
      AttrTable
    };
  },
}
</script>

<style lang="scss">
.sticky {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
