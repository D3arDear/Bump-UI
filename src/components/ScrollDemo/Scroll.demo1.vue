<demo>
默认 Scroll 用法
</demo>
<template>
  <div class="switchSection">
    <Scroll style="height: 400px; width: 100%; margin: auto">
      <p style="margin: 0" v-for="i in 100">{{ "这里是第" + i + "行字" }}</p>
    </Scroll>
  </div>
</template>

<script lang="ts" setup>
import Scroll from "../lib/Scroll/Scroll.vue";
</script>

<style lang="scss" scoped>
</style>