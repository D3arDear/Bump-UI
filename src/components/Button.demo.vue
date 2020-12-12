<template>
  <div>Button 示例</div>
  <h1>示例1</h1>
  <div><Button>默认按钮</Button></div>
  <div><Button>默认突起按钮</Button></div>
</template>

<script>
import Button from "./lib/Button/Button.vue";
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
@import "../style/theme.scss";
.test {
  margin: 10px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-self: center;
  @include shadow(topLeft, #f8f8f8, 12px, false);
  @include surface(topLeft, #f8f8f8, concave);
}
</style>
