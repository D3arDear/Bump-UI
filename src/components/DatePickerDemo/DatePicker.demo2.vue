<demo>
DateRangePicker 基本用法
</demo>
<template>
  <DatePicker :value="days" @input="d = $event" :scope="scope"></DatePicker>
</template>
<script lang="ts">
import { ref } from 'vue'
import DateRangePicker from '../../lib/DatePicker/DateRangePicker.vue'
export default {
  setup() {
    const days = ref([])
    const scope = ref([new Date(1958, 1), new Date(2118, 5)])
    return {
      DateRangePicker,
      days, scope
    }
  }
}
</script>