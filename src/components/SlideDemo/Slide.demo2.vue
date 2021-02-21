<demo>
可取消自动播放
</demo>
<template>
  <div>
    <Slides class="wrapper" v-model:selected="selected" :autoPlay="false">
      <Slides-item name="1">
        <div class="box-1">1</div>
      </Slides-item>
      <Slides-item name="2">
        <div class="box-2">2</div>
      </Slides-item>
      <Slides-item name="3">
        <div class="box-3">3</div>
      </Slides-item>
    </Slides>
  </div>
</template>
<script lang="ts" setup>
import Slides from '../../lib/Slides/Slides.vue'
import SlidesItem from '../../lib/Slides/Slides-item.vue'
import { ref } from 'vue';
const name = "demo"
const selected = ref("2")
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  margin: 40px;
}
.box {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  &-1 {
    @extend .box;
    background: white;
  }
  &-2 {
    @extend .box;
    background: grey;
  }
  &-3 {
    @extend .box;
    background: black;
  }
}
</style>