<demo>
hover 弹出 Popover
</demo>
<template>
  <div class="Popover-section">
    <div class="Popover-section-item">
      <Popover trigger="hover">
        <Button>上方弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
    <div class="Popover-section-item">
      <Popover trigger="hover" position="bottom">
        <Button>下方弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
    <div class="Popover-section-item">
      <Popover trigger="hover" position="left">
        <Button>左边弹出</Button>
        <template v-slot:content> 弹出内容 </template>
      </Popover>
    </div>
    <div class="Popover-section-item">
      <Popover trigger="hover" position="right">
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
  &-item {
    margin: 10px;
  }
}
</style>