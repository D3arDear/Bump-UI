<demo>
圆角按钮
</demo>
<template>
  <div class="button-demo__section">
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
      <Button class="button" rounded surfaceStyle="concave" bodyStyle="concave"
        >圆角表面凹陷按钮</Button
      >
    </section>
  </div>
</template>
<script lang="ts">
import Button from "../lib/Button/Button.vue";
export default {
  components: {
    Button,
  },
};
</script>
<style lang="scss" scoped>
@import "./Button.demo.scss";
</style>