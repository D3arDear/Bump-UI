<demo>
按钮等级
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button class="button">默认</Button>
      <Button class="button" level="primary">主要</Button>
      <Button class="button" level="success">成功</Button>
      <Button class="button" level="info">信息</Button>
      <Button class="button" level="warning">警告</Button>
      <Button class="button" level="danger">危险</Button>
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