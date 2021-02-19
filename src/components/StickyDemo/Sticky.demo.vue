<template>
  <div class="switch">
    <h1>Sticky 组件</h1>
    <Demo :component="StickyDemo1" defaultVisible>
      <p>distance 可以控制粘连内容距视口顶端多少距离</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import StickyDemo1 from './Sticky.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      StickyDemo1,
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
