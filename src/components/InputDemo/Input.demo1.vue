<demo>
默认 input 组件
</demo>
<template>
  <Input v-model:value="value"></Input>
  <Input v-model:value="value" disabled></Input>
  <Input v-model:value="value" readonly></Input>
  <div>value: {{ value }}</div>
</template>
<script lang="ts">
import Input from '../../lib/Input/Input.vue'
import { ref } from 'vue'
export default {
  setup(props, context) {
    const value = ref('value')
    return {
      Input,
      value
    }
  }
}
</script>