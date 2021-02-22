<demo>
DatePicker 基本用法
</demo>
<template>
  <DatePicker :value="d" @input="d = $event" :scope="scope"></DatePicker>
</template>
<script lang="ts">
import DatePicker from '../../lib/DatePicker/DatePicker.vue'
export default {
  setup() {

    return {
      DatePicker
    }
  }
}
</script>