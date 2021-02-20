<demo>
error 属性
</demo>
<template>
  <Input
    v-model:value="value"
    type="password"
    label="value"
    error="这里有问题"
  ></Input>
  <Input
    v-model:value="value"
    type="password"
    label="value"
    errorPosition="right"
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