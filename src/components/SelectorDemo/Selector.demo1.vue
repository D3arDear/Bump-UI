<demo> Selector 的基本用法 </demo>
<template>
  <Selector width="5em" v-model:value="value" :sourceData="sourceData" />
</template>
<script lang="ts">
import Selector from '../../lib/Selector/SingleSelector.vue'
import { ref } from 'vue'
export default {
  components: {
    Selector
  },
  setup() {
    const value = ref('')
    const sourceData = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    return { sourceData, value }
  }
}
</script>
<style lang="scss">
</style>