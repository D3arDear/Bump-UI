<demo>
接受 barColor 属性，决定滑块颜色。
</demo>
<template>
  <div class="switchSection">
    <Scroll style="height: 400px; width: 100%; margin: auto" barColor="#f8f8f8">
      <p style="margin: 0" v-for="i in 100">{{ "这里是第" + i + "行字" }}</p>
    </Scroll>
  </div>
</template>

<script lang="ts">
import Scroll from "../lib/Scroll/Scroll.vue";
export default {
  components: { Scroll },
}
</script>

<style lang="scss" scoped>
</style>