<template>
  <div class="scroll">
    <h1>Scroll 组件</h1>
    <Demo :component="ScrollDemo1">
      <p>Scroll 的基本用法</p>
    </Demo>
    <Demo :component="ScrollDemo2">
      <p>barColor 属性接受一个类型为 string 的颜色值</p>
    </Demo>
    <AttrTable title="Scroll Attributes" :sourceData="scrollAttr" />
  </div>
</template>

<script lang="ts" setup>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import ScrollDemo1 from './Scroll.demo1.vue'
import ScrollDemo2 from './Scroll.demo2.vue'

const scrollAttr = [
  {
    id: 0,
    attr: 'barColor',
    content: "barColor 属性接受一个类型为 string 的颜色值，决定滚动条颜色",
    type: 'string',
    option: "",
    default: '',
    required: 'false',
    description: ''
  },
]
</script>

<style lang="scss">
.scroll {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  .scrollSection {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
}
</style>
