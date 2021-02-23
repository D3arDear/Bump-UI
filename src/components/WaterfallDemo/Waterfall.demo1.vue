<demo> waterfall 基本用法 </demo> 

<template>
  <div class="waterfallContainer" ref="waterfallcontaienr">
    <Waterfall
      :width="150"
      :source="source"
      @scroll-to-bottom="loadNewData"
      :container="waterfallContainer"
    >
      <template v-slot="slotProps">
        <div
          class="waterfallItem"
          :style="{ height: slotProps.props.height + 'px' }"
        >
          <div>slot</div>
          <div>{{ slotProps.props.height }}</div>
        </div>
      </template>
    </Waterfall>
  </div>
</template>
<script lang="ts">
import Waterfall from '../../lib/Waterfall/Waterfall.vue'
import { onMounted, reactive, ref } from 'vue'
export default {
  components: {
    Waterfall
  },
  setup() {
    const waterfallContainer = ref(null)
    // const source = ref([].fill({ size: '宽度 100 像素' }, 0, 10))
    const source = reactive([
      { height: 100 },
      { height: 200 },
      { height: 400 },
      { height: 50 },
      { height: 200 },
      { height: 150 },
      { height: 250 },
      { height: 120 },
      { height: 30 },
      { height: 80 },
      { height: 120 },
    ])
    const loadNewData = () => {
      // 模拟请求
      setTimeout(() => {
        source.push(
          { height: 100 },
          { height: 200 },
          { height: 400 },
          { height: 50 },
          { height: 200 },
          { height: 150 },
          { height: 250 },
          { height: 120 },
          { height: 30 },
          { height: 80 },
          { height: 120 })
      }, 1000);
    }

    onMounted(() => {
      console.log(waterfallContainer)
    })

    return { source, loadNewData, waterfallContainer }
  }
}
</script>
<style lang="scss">
.waterfallItem {
  background: #aaa;
  border-radius: 8px;
  margin: 8px;
}
</style>