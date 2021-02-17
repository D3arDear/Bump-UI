<template>
  <div class="scroll">
    <h1>Scroll 组件</h1>
    <Demo :component="ScrollDemo1">
      <p>Scroll 的基本用法</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import ScrollDemo1 from './Scroll.demo1.vue'

export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      ScrollDemo1
    };
  },
}
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
