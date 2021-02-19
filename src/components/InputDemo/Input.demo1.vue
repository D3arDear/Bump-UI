<demo>
默认 input 组件
</demo>
<template>
  <Input value="中文"></Input>
  <Input value="中文" disabled></Input>
  <Input value="中文" readonly></Input>
</template>
<script lang="ts">
import Input from '../lib/Input/Input.vue'
export default {
  setup(props, context) {
    return {
      Input
    }
  }
}
</script>