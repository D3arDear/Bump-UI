<demo>
pager 的默认用法
</demo>
<template>
  <div :style="{ width: '100%' }">
    <Pager v-model:currentPage="currentPage" :totalPage="20" />
  </div>
</template>
<script lang="ts">
import Pager from '../lib/Pager/Pager.vue'
import { ref } from 'vue'
export default {
  components: { Pager },
  setup() {
    const currentPage = ref(2)
    return {
      currentPage
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
