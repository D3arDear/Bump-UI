<template>
  <div class="table">
    <h1>Table 组件</h1>
    <!-- <Demo :component="TableDemo1">
      <p>Table 的基本用法 value 控制 Table 开关状态</p>
    </Demo> -->
    <Demo :component="TableDemo2">
      <p>Table 的基本用法 value 控制 Table 开关状态</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import TableDemo1 from './Table.demo1.vue'
import TableDemo2 from './Table.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      TableDemo2,
    };
  },
}
</script>

<style lang="scss">
.table {
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
