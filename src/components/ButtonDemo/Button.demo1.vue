<demo>
默认样式
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button class="button">默认按钮</Button>
      <Button class="button" surfaceStyle="concave" bodyStyle="convex">
        表面凹陷凸起按钮
      </Button>
      <Button class="button" surfaceStyle="convex" bodyStyle="convex">
        表面凹陷凸起按钮
      </Button>
      <Button class="button" surfaceStyle="flat" bodyStyle="convex">
        表面平整凸起按钮
      </Button>
      <Button class="button" surfaceStyle="concave" bodyStyle="convex">
        表面凹陷凸起按钮
      </Button>
      <Button class="button" surfaceStyle="concave" bodyStyle="concave">
        表面凹陷按钮
      </Button>
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
.button {
  margin: 5px;
}
</style>