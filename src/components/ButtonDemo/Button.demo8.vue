<demo>
加载中
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button class="button" loading>加载中</Button>
      <Button class="button" level="success" loading textButton>加载中</Button>
      <Button class="button" level="warning" loading textButton size="medium"
        >加载中</Button
      >
      <Button class="button" level="error" loading size="small">加载中</Button>
      <Button class="button" level="success" loading textButton size="mini"
        >加载中</Button
      >
    </section>
  </div>
</template>
<script lang="ts">
import Button from "../../lib/Button/Button.vue";
export default {
  components: {
    Button,
  },
};
</script>
<style lang="scss" scoped>
@import "./Button.demo.scss";
</style>