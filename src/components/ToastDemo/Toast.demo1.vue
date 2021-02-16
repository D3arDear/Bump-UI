<demo>
默认 Toast 开关
</demo>
<template>
  <div class="Toast-section">
    <div class="Toast-section-item">
      <Toast> 我不知道需要传什么 </Toast>
    </div>
  </div>
</template>


<script lang="ts">
import Toast from "../lib/Toast/Toast.vue";
import Button from '../lib/Button/Button.vue'
export default {
  components: { Toast, Button },
}
</script>

<style lang="scss" scoped>
.Toast-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  &-item {
    margin: 10px;
  }
}
</style>