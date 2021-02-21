<demo>
standard 属性
</demo>
<template>
  <Input v-model:value="value" label="value" standard></Input>
  <Input v-model:value="value" type="password" label="value" standard></Input>
</template>
<script lang="ts">
import Input from '../../lib/Input/Input.vue'
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