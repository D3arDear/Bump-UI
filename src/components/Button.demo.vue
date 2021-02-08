<template>
  <div class="button-demo">
    <h1>Button组件</h1>
    <div class="button-demo__section">
      <h2>默认样式</h2>
      <section>
        <Button class="button">默认按钮</Button>
        <Button class="button" surfaceTheme="concave" bodyTheme="convex"
          >表面凹陷凸起按钮</Button
        >
        <Button class="button" surfaceTheme="convex" bodyTheme="convex"
          >表面凹陷凸起按钮</Button
        >
        <Button class="button" surfaceTheme="flat" bodyTheme="convex"
          >表面平整凸起按钮</Button
        >
        <Button class="button" surfaceTheme="concave" bodyTheme="convex"
          >表面凹陷凸起按钮</Button
        >
        <Button class="button" surfaceTheme="concave" bodyTheme="concave"
          >表面凹陷按钮</Button
        >
      </section>
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
  .button-demo__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .button {
        margin: 5px;
      }
    }
  }
}
</style>
