<demo>
默认 input 组件
</demo>
<template>
  <Input v-model:value="value" label="value"></Input>
  <Input v-model:value="value" type="password" label="value"></Input>
  <Input
    v-model:value="value"
    type="password"
    label="value"
    error="这里有问题"
  ></Input>
</template>
<script lang="ts">
import Input from '../lib/Input/Input.vue'
import { ref } from 'vue'
export default {
  components: {
    Input
  },
  setup(props, context) {
    const value = ref('')
    return {
      value
    }
  }
}
</script>