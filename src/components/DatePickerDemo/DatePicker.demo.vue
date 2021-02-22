<template>
  <div class="DatePicker">
    <h1>DatePicker 组件</h1>
    <Demo :component="DatePickerDemo1" defaultVisible>
      <p>DatePicker 基本用法</p>
    </Demo>
  </div>
</template>

<script lang="ts" scoped>
import Demo from "../Demo.vue";
import DatePickerDemo1 from './DatePicker.demo1.vue'
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      DatePickerDemo1,
    };
  },
}
</script>

<style lang="scss">
.DatePicker {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
