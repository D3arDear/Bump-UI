<demo>
文字按钮
</demo>
<template>
  <div class="button-demo__section">
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