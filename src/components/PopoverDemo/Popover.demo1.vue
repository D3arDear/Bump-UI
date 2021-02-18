<demo>
默认 Popover 开关
</demo>
<template>
  <div class="Popover-section">
    <div class="Popover-section-item">
      <Popover>
        <Button>上方弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
    <div class="Popover-section-item">
      <Popover position="bottom">
        <Button>下方弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
    <div class="Popover-section-item">
      <Popover position="left">
        <Button>左边弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
    <div class="Popover-section-item">
      <Popover position="right">
        <Button>右边弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
  </div>
</template>


<script lang="ts">
import Popover from "../lib/Popover/Popover.vue";
import Button from '../lib/Button/Button.vue'
export default {
  components: { Popover, Button },
}
</script>

<style lang="scss" scoped>
.Popover-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  &-item {
    margin: 10px;
  }
}
</style>