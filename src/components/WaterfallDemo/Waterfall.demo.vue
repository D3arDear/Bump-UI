<template>
  <div class="waterfall">
    <h1>WaterFall 组件</h1>
    <Demo :component="WaterfallDemo1" defaultVisible>
      <p>瀑布流布局的基本用法</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import WaterfallDemo1 from './Waterfall.demo1.vue'
// @ts-ignore
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      WaterfallDemo1
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
