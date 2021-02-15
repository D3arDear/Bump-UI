<template>
  <div class="switch">
    <h1>Switch 组件</h1>
    <Demo :component="SwitchDemo1" />
    <Demo :component="SwitchDemo2" />
    <Demo :component="SwitchDemo3" />
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import SwitchDemo1 from './Switch.demo1.vue'
import SwitchDemo2 from './Switch.demo2.vue'
import SwitchDemo3 from './Switch.demo3.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      SwitchDemo1,
      SwitchDemo2,
      SwitchDemo3,
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
