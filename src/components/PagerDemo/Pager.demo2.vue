<demo>
hideIfOnePage 控制是否隐藏分页器
</demo>
<template>
  <div :style="{ width: '100%' }">
    <Pager
      v-model:currentPage="currentPage"
      :totalPage="1"
      :hideIfOnePage="false"
    />
  </div>
  <p>这时候只有一页但是并没有隐藏</p>
</template>
<script lang="ts">
import Pager from '../../lib/Pager/Pager.vue'
import { ref } from 'vue'
export default {
  components: { Pager },
  setup() {
    const currentPage = ref(1)
    return {
      currentPage
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
