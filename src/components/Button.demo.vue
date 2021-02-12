<template>
  <div class="button-demo">
    <h1>Button组件</h1>
    <div class="button-demo__section">
      <h2>默认样式</h2>
      <section>
        <Button class="button">默认按钮</Button>
        <Button class="button" surfaceStyle="concave" bodyStyle="convex"
          >表面凹陷凸起按钮</Button
        >
        <Button class="button" surfaceStyle="convex" bodyStyle="convex"
          >表面凹陷凸起按钮</Button
        >
        <Button class="button" surfaceStyle="flat" bodyStyle="convex"
          >表面平整凸起按钮</Button
        >
        <Button class="button" surfaceStyle="concave" bodyStyle="convex"
          >表面凹陷凸起按钮</Button
        >
        <Button class="button" surfaceStyle="concave" bodyStyle="concave"
          >表面凹陷按钮</Button
        >
      </section>
    </div>
    <div class="button-demo__section">
      <h2>圆角按钮</h2>
      <section>
        <Button class="button" rounded>默认圆角按钮</Button>
        <Button class="button" rounded surfaceStyle="concave" bodyStyle="convex"
          >圆角表面凹陷凸起按钮</Button
        >
        <Button class="button" rounded surfaceStyle="convex" bodyStyle="convex"
          >圆角表面凹陷凸起按钮</Button
        >
        <Button class="button" rounded surfaceStyle="flat" bodyStyle="convex"
          >圆角表面平整凸起按钮</Button
        >
        <Button class="button" rounded surfaceStyle="concave" bodyStyle="convex"
          >圆角表面凹陷凸起按钮</Button
        >
        <Button
          class="button"
          rounded
          surfaceStyle="concave"
          bodyStyle="concave"
          >圆角表面凹陷按钮</Button
        >
      </section>
    </div>
    <div class="button-demo__section">
      <h2>按钮等级</h2>
      <section>
        <Button class="button">默认</Button>
        <Button class="button" level="primary">主要</Button>
        <Button class="button" level="success">成功</Button>
        <Button class="button" level="info">信息</Button>
        <Button class="button" level="warning">警告</Button>
        <Button class="button" level="danger">危险</Button>
      </section>
    </div>
    <div class="button-demo__section">
      <h2>按钮大小</h2>
      <section>
        <Button class="button">默认按钮</Button>
        <Button class="button" size="medium">中型按钮</Button>
        <Button class="button" size="small">小型按钮</Button>
        <Button class="button" size="mini">超小按钮</Button>
      </section>
    </div>
    <div class="button-demo__section">
      <h2>不可用</h2>
      <section>
        <Button class="button" disabled>不可用</Button>
        <Button class="button" surfaceStyle="concave" disabled> 不可用</Button>
        <Button class="button" disabled size="medium">不可用</Button>
        <Button class="button" disabled size="small">不可用</Button>
        <Button class="button" disabled size="mini">不可用</Button>
        <Button class="button" disabled size="mini" textButton>不可用</Button>
      </section>
    </div>
    <div class="button-demo__section">
      <h2>文字按钮</h2>
      <section>
        <Button class="button" textButton>默认按钮</Button>
        <Button class="button" level="success" textButton>成功按钮</Button>
        <Button class="button" level="info" textButton>信息按钮</Button>
        <Button class="button" level="danger" textButton>危险按钮</Button>
        <Button class="button" level="warning" textButton>警告按钮</Button>
      </section>
      <section>
        <Button class="button" textButton>默认按钮</Button>
        <Button class="button" size="medium" textButton>中型按钮</Button>
        <Button class="button" size="small" textButton>小型按钮</Button>
        <Button class="button" size="mini" textButton>迷你按钮</Button>
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
        margin: 5px;
      }
    }
  }
}
</style>
