<demo>
默认 input 组件
</demo>
<template>
  <Input v-model:value="value"></Input>
  <div>value: {{ value }}</div>
</template>
<script lang="ts">
import Input from '../lib/Input/Input.vue'
import { ref } from 'vue'
export default {
  components: {
    Input
  },
  setup(props, context) {
    const value = ref('这里有内容需要修改')
    return {
      value
    }
  }
}
</script>