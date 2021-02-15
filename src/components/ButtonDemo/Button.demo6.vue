<demo>
不可用
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button class="button" disabled>不可用</Button>
      <Button class="button" surfaceStyle="concave" disabled> 不可用</Button>
      <Button class="button" disabled size="medium">不可用</Button>
      <Button class="button" disabled size="small">不可用</Button>
      <Button class="button" disabled size="mini">不可用</Button>
      <Button class="button" disabled size="mini" textButton>不可用</Button>
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