<demo>
DatePicker 基本用法
</demo>
<template>
  <DatePicker v-model:value="day" :scope="scope"></DatePicker>
</template>
<script lang="ts">
import { ref } from 'vue'
import DatePicker from '../../lib/DatePicker/DatePicker.vue'
export default {
  setup() {
    const day = ref()
    const scope = ref([new Date(1958, 1), new Date(2118, 5)])
    return {
      DatePicker,
      day, scope
    }
  }
}
</script>