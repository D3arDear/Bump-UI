<template>
  <div class="slides">
    <h1>Slides 组件</h1>
    <Demo :component="SlideDemo1">
      <p>Slider 的基本用法。 selected = name 的内容会被显示</p>
    </Demo>
    <Demo :component="SlideDemo2">
      <p>autoPlay 控制是否开启自动轮播，默认开启</p>
    </Demo>
    <AttrTable title="Slides Attributes" :sourceData="slidesAttr" />
    <AttrTable title="Slides-item Attributes" :sourceData="slidesItemAttr" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import SlideDemo1 from './Slide.demo1.vue'
import SlideDemo2 from './Slide.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {

    const slidesAttr = [
      {
        id: 0,
        attr: 'selected',
        content: "Slides 的绑定值，决定当前显示的 Slides-item",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'autoPlay',
        content: "是否开启自动轮播",
        type: 'boolean',
        option: '',
        default: 'true',
        required: 'false',
        description: ''
      },
      {
        id: 2,
        attr: 'autoPlayDelay',
        content: "自动轮播的间隔时间",
        type: 'number',
        option: '',
        default: '3000',
        required: 'false',
        description: '单位：毫秒'
      },
    ]
    const slidesItemAttr = [
      {
        id: 0,
        attr: 'name',
        content: "slidesItem 的 name ，父元素依该值决定 item 的显示",
        type: 'string',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'v-slot:default',
        content: "默认插槽的的内容为 Item 的内容",
        type: '',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
    ]
    return {
      SlideDemo1,
      SlideDemo2,
      slidesAttr, slidesItemAttr
    };
  },
}
</script>

<style lang="scss">
.slides {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
