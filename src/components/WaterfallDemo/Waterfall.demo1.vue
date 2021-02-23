<demo>
waterfall 基本用法
</demo>
<template>
  <Waterfall :width="150" :source="source" @scroll-to-bottom="loadNewData">
    <template v-slot:default="slotProps">
      <div class="waterfallItem">
        <div>slot</div>
        <div>{{ slotProps }}</div>
      </div>
    </template>
  </Waterfall>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    // const source = ref([].fill({ size: '宽度 100 像素' }, 0, 10))
    const source = ref([
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
      { size: '宽度 100 像素' },
    ])
    const loadNewData = () => {
      source.value.push({ size: '新-宽度 100 像素' })
    }
    return { source, loadNewData }
  }
}
</script>
<style lang="scss">
.waterfallItem {
  background: #666;
  border: 1px solid red;
}
</style>