<template>
  <div class="button-demo">
    <h1>Cascader 组件</h1>
    <Demo :component="CascaderDemo1">
      <p>这是 Cascader 功能</p>
    </Demo>
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import CascaderDemo1 from "./Cascader.demo1.vue";
export default {
  name: "ButtonDemo",
  components: { Demo },
  setup() {
    return {
      CascaderDemo1
    };
  },
};
</script>

<style lang="scss" scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .button {
        margin: 5px 0;
      }
    }
  }
}
</style>
