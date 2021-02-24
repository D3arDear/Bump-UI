<demo>
DateRangePicker 基本用法
</demo>
<template>
  <DateRangePicker
    :value="days"
    @update:value="updateDays"
    @input="days = $event"
    :scope="scope"
  ></DateRangePicker>
</template>
<script lang="ts">
import { reactive, ref } from 'vue'
import DateRangePicker from '../../lib/DatePicker/DateRangePicker.vue'
export default {
  setup() {
    const days = reactive([new Date(), null])
    const scope = ref([new Date(1958, 1), new Date(2118, 5)])
    const updateDays = (payload) => {
      payload.start ? days[0] = payload.date : days[1] = payload.date
    }
    return {
      DateRangePicker,
      days, scope, updateDays
    }
  }
}
</script>