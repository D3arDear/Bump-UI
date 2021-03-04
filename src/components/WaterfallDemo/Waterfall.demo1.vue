<demo> waterfall 基本用法 </demo> 

<template>
  <div
    id="waterfallContainer"
    class="waterfallContainer"
    :style="{ height: '300px' }"
  >
    <Waterfall
      :width="80"
      :sourceData="source"
      @scroll-to-bottom="loadNewData"
      containerId="waterfallContainer"
    >
      <template v-slot="slotProps">
        <div
          class="waterfallItem"
          :style="{ height: slotProps.props.height + 'px' }"
        >
          <div :style="{ color: '#777' }">
            {{ "高度: " + slotProps.props.height + "px" }}
          </div>
        </div>
      </template>
    </Waterfall>
  </div>
</template>
<script lang="ts">
import Waterfall from '../../lib/Waterfall/Waterfall.vue'
import { computed, reactive, ref } from 'vue'
export default {
  components: {
    Waterfall
  },
  setup(props, context) {
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
          { height: 250 })
      }, 1000);
    }
    return { source, loadNewData }
  }
}
</script>
<style lang="scss">
.waterfallContainer {
  width: 100%;
  overflow: auto;
}
.waterfallItem {
  background: #ddd;
  padding: 4px;
  border-radius: 8px;
  margin: 8px;
}
</style>