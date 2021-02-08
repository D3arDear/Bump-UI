<template>
  <div class="button-demo">
    <h1>Button组件</h1>
    <div><Button>默认按钮</Button></div>
    <div>
      <Button surfaceTheme="concave" bodyTheme="convex">表面凹陷按钮</Button>
    </div>
    <div>
      <Button surfaceTheme="convex" bodyTheme="convex">表面凸起按钮</Button>
    </div>
    <div>
      <Button surfaceTheme="concave" bodyTheme="concave">表面凹陷按钮</Button>
    </div>
  </div>
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
.button-demo {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
