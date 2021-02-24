<template>
  <div :class="classes('', '', '')" ref="rootElement">
    <template v-if="col && sourceData && sourceData.length">
      <div
        :class="classes('', 'colItem', '')"
        :style="{ width: width }"
        v-for="(n, index) in col"
        :key="index"
        :ref="
          (el) => {
            colItemRef[index] = el;
          }
        "
      ></div>
      <div
        :class="classes('', 'item', '')"
        v-for="(item, index) in sourceData"
        :key="`item-${index}`"
        :ref="
          (el) => {
            itemRef[index] = el;
          }
        "
      >
        <slot :props="item"></slot>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, PropType, ref, watch } from 'vue'
import { classMaker } from '../common/classMaker'
export default {
  name: 'BUI-Waterfall',
  props: {
    width: {
      type: Number,
      default: 200
    },
    sourceData: {
      type: Array,
      required: true
    },
    container: {
      type: Object as PropType<HTMLDivElement>
    },
    containerId: {
      type: String
    }
  },
  setup(props, context) {
    const classes = classMaker('BUI-Waterfall')

    const col = ref<number>(0)
    const gutter = ref<number>(0)
    const heightArr = ref<number[]>([])

    const rootElement = ref<HTMLDivElement>(null)
    const colItemRef = ref<HTMLDivElement[]>([])
    const itemRef = ref<HTMLDivElement[]>([])
    const containerRef = ref(null)


    onBeforeUpdate(() => {
      colItemRef.value = []
      itemRef.value = []
    })


    const getContainer = () => {
      if (props.container) {
        containerRef.value = props.container
      } else if (props.containerId) {
        containerRef.value = document.getElementById(`${props.containerId}`)
      } else {
        containerRef.value = document.documentElement || document.body
      }
      if (containerRef.value !== (document.documentElement || document.body)) {
        containerRef.value.addEventListener('scroll', scrollListener)
      } else {
        window.addEventListener('scroll', scrollListener)
      }
    }
    const sourceData = computed(() => props.sourceData).value
    const parent = getCurrentInstance().parent;

    const getPositionData = (container) => {
      const scrollHeight = container.scrollHeight
      const scrollTop = container.scrollTop
      const clientHeight = container.clientHeight
      return { scrollHeight, scrollTop, clientHeight }
    }

    const scrollListener = () => {
      const { scrollHeight, scrollTop, clientHeight } = getPositionData(containerRef.value);
      if (scrollHeight - scrollTop < clientHeight + 10) {
        context.emit('scroll-to-bottom')
        containerRef.value ?
          containerRef.value.removeEventListener('scroll', scrollListener) : window.removeEventListener('scroll', scrollListener)
      }
    }

    const updateEachCol = async () => {
      await nextTick(() => {
        itemRef.value.forEach(item => {
          item.style.width = props.width + 'px'
          let minHeight = Math.min.apply(undefined, heightArr.value)
          let index = heightArr.value.indexOf(minHeight)
          let { height } = item.getBoundingClientRect()
          item.style.top = minHeight + 'px'
          if (col.value === 1) {
            item.style.left = gutter.value + 'px'
          } else {
            item.style.left = gutter.value * index + props.width * index + 'px'
          }
          colItemRef.value[index].style.height = (minHeight + height) + 'px'
          // this.$set(heightArr, index, minHeight + height)
          heightArr.value[index] = minHeight + height
        })
      })
    }

    const resize = () => {
      rootElement.value.style.width = 'auto'
      let { width: maxWidth } = rootElement.value.getBoundingClientRect()
      rootElement.value.style.width = maxWidth + 'px'
      col.value = Math.floor(maxWidth / props.width) // 计算能分多少列
      if (col.value === 1) {
        gutter.value = (maxWidth - props.width) / 2
      } else {
        gutter.value = (maxWidth - props.width * col.value) / (col.value - 1) //空隙
      }
      heightArr.value = Array(col.value).fill(0);
      updateEachCol()
    }

    onMounted(async () => {
      getContainer()
      resize()
      await nextTick(() => {
        resize();
        window.addEventListener('resize', resize)
      })
    })
    onBeforeUnmount(() => {
      containerRef.value ? removeEventListener('scroll', scrollListener) : window.removeEventListener('scorll', scrollListener)
      window.removeEventListener('resize', resize)
    })

    watch(() => [...sourceData], () => {
      resize();
      containerRef.value.removeEventListener('scroll', scrollListener)
      containerRef.value.addEventListener('scroll', scrollListener)
    }, { deep: true })


    return {
      classes,
      col, gutter, heightArr,
      rootElement, colItemRef, itemRef, resize
    }
  },
}
</script>
<style scoped lang="scss">
.BUI-Waterfall {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  &__colItem {
    flex-shrink: 0;
  }
  &__item {
    width: 200px;
    position: absolute;
  }
}
</style>