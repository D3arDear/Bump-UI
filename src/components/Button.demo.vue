<template>
  <div>Button 示例</div>
  <h1>示例1</h1>
  <div><Button>纸片</Button></div>
  <div class="test">测试背景</div>
</template>

<script>
import Button from "./lib/Button.vue";
export default {
  name: "ButtonDemo",
  components: { Button },
  setup() {
    const onClick = () => {
      console.log("hi");
    };
    return { onClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../theme.scss";
.test {
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background: surfaceShadow-convex-generator(145deg, #f8f8f8);
  box-shadow: shadow-generator(topLeft, #f8f8f8, 12px, false);
}
</style>
