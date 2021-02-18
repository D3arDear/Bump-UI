<template>
  <div class="slider">
    <h1>Slider 组件</h1>
    <Demo :component="SlideDemo1">
      <p>Slider 的基本用法 value 控制 Slider 开关状态</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import SlideDemo1 from './Slide.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      SlideDemo1
    };
  },
}
</script>

<style lang="scss">
.slider {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  .sliderSection {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
}
</style>
