<demo>
按钮大小
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button class="button">默认按钮</Button>
      <Button class="button" size="medium">中型按钮</Button>
      <Button class="button" size="small">小型按钮</Button>
      <Button class="button" size="mini">超小按钮</Button>
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