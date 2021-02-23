<template>
  <div :class="classes('', '', '')" ref="rootElement">
    <template v-if="col && source && source.length">
      <div
        :class="classes('', 'colItem', '')"
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
        v-for="(item, index) in source"
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
import { getCurrentInstance, nextTick, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, PropType, ref, watch } from 'vue'
import { classMaker } from '../common/classMaker'
export default {
  name: 'BUI-Waterfall',
  props: {
    width: {
      type: Number,
      default: 200
    },
    source: { type: Array, required: true },
    container: {
      type: Object as PropType<HTMLElement>
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


    onBeforeUpdate(() => {
      colItemRef.value = []
      itemRef.value = []
    })


    const container = props.container
    const source = props.source
    const parent = getCurrentInstance().parent;

    const getPositionData = (container) => {
      const scrollHeight = container.scrollHeight
      const scrollTop = container.scrollTop
      const clientHeight = container.clientHeight
      return { scrollHeight, scrollTop, clientHeight }
    }

    const scrollListener = () => {
      const { scrollHeight, scrollTop, clientHeight } = container ? getPositionData(container) : (getPositionData(document.documentElement) || getPositionData(document.body))
      if (scrollHeight - scrollTop < clientHeight + 10) {
        context.emit('scroll-to-bottom')
        container ? container.removeEventListener('scroll', scrollListener) :
          window.removeEventListener('scroll', scrollListener)
      }
    }

    const updateEachHeight = async () => {
      await nextTick(() => {
        colItemRef.value.forEach(element => {
          element.style.width = props.width + 'px' //设置每一列的宽度
        });
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
      let { width: mainWidth } = rootElement.value.getBoundingClientRect()
      rootElement.value.style.width = mainWidth + 'px'
      col.value = Math.floor(mainWidth / props.width) //计算分多少列
      if (col.value === 1) {
        gutter.value = (mainWidth - props.width) / 2
      } else {
        gutter.value = (mainWidth - props.width * col.value) / (col.value - 1) //空隙
      }
      heightArr.value = Array(col.value).fill(0);
      updateEachHeight()
    }

    onMounted(async () => {
      resize()
      if (container) {
        container.addEventListener('scroll', scrollListener)
      } else {
        window.addEventListener('scroll', scrollListener)
      }
      await nextTick(() => {
        resize();
        window.addEventListener('resize', resize)
      })
    })
    onBeforeUnmount(() => {
      container ? container.removeEventListener('scroll', scrollListener) :
        window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', resize)
    })

    watch(() => [...source], () => {
      resize();
      container ? container.removeEventListener('scroll', scrollListener) :
        window.removeEventListener('scroll', scrollListener)
      container ? container.addEventListener('scroll', scrollListener) :
        window.addEventListener('scroll', scrollListener)
    }, { deep: true })


    return {
      classes,
      col, gutter, heightArr,
      rootElement, colItemRef, itemRef
    }
  },
}
</script>
<style scoped lang="scss">
.BUI-Waterfall {
  width: 100%;
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