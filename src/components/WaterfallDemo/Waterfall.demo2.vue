<demo>瀑布流布局基本用法</demo>

<template>
  <div ref="waterfallContainer" class="waterfallContainer">
    <Waterfall
      :width="200"
      :sourceData="sourceData"
      v-on:scroll-to-bottom="updateData"
    >
      <template v-slot:default="slotProps">
        <div
          :style="{ background: '#aaa', height: `${slotProps.props.height}px` }"
        >
          {{ `高度${slotProps.props.height}` }}
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Waterfall from '../../lib/Waterfall/Waterfall.vue'
export default {
  components: { Waterfall },
  setup(props, context) {
    const sourceData = ref([
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
    return {
      sourceData,
    }
  }
}
</script>