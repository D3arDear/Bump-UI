<demo> Selector 的基本用法 </demo>
<template>
  <Selector width="5em" v-model:value="value" :sourceData="sourceData" />
</template>
<script lang="ts">
import Selector from '../../lib/Selector/Selector.vue'
import { ref } from 'vue'
export default {
  components: {
    Selector
  },
  setup() {
    const value = ref('')
    const sourceData = [...new Array(12).keys()];
    console.log(sourceData)
    return { sourceData, value }
  }
}
</script>
<style lang="scss">
</style>