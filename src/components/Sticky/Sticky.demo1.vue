<template>
  <div style="display: flex; justify-content: center">
    <div class="container">
      <p v-for="i in 5">{{ `段落${i}` }}</p>
      <Sticky :distance="20">
        <Button>这里是一个段落</Button>
      </Sticky>
      <p v-for="i in 40">{{ `段落${i}` }}</p>
    </div>
  </div>
</template>

<script>
  import Sticky from '../lib/Sticky/Sticky.vue'
  import Button from '../lib/Button/Button.vue'
  export default {
    components: {Sticky,Button},
  };
</script>
<style scoped lang="scss">
.container {
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 0 8px rgba(#000000, 0.5);
  padding: 10px;
}
</style>