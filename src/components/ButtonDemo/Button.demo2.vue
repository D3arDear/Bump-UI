<demo>
渐变背景
</demo>
<template>
  <div class="button-demo__section">
    <section>
      <Button
        class="button"
        :linearColor="{
          colors: ['#FE6B8B', '#FF8E53'],
          angle: '45',
        }"
        >渐变背景</Button
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
  setup() {
    const onClick = () => {
      console.log("hi");
    };
    return { onClick };
  },
};
</script>
<style lang="scss" scoped>
.button {
  margin: 5px;
}
</style>