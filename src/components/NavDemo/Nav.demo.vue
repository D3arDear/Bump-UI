<template>
  <div class="Nav">
    <h1>Nav 组件</h1>
    <Demo :component="NavDemo1" defaultVisible>
      <p>Nav 基本用法</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import NavDemo1 from './Nav.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      NavDemo1
    };
  },
}
</script>

<style lang="scss">
.Nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
