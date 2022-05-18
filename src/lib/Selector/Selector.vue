<template>
  <div :class="classes('', '', '')" :style="{ width: width }" ref="wrapper">
    <Input
      type="text"
      @click="openList"
      :value="value"
      :class="classes('input', '', '')"
      ref="selectorInput"
      standard
    />
    <div :class="classes('list-wrapper', '', '')" v-if="listVisible">
      <ul :class="classes('list', '', '')">
        <Scroll :style="{ width: width, height: '9em' }" :initY="initScroll">
          <li
            v-for="(item, index) in sourceData"
            :key="index"
            @click.stop="onClickItem(item)"
            raf="itemWrapper"
            :class="classes('list', 'item', '')"
          >
            {{ item }}
          </li>
        </Scroll>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { classMaker } from '../common/classMaker'
import Input from '../Input/Input.vue'
import Scroll from '../Scroll/Scroll.vue'
export default {
  components: { Input, Scroll },
  props: {
    sourceData: {
      type: Array,
      require: true
    },
    width: {
      type: String,
      require: true
    },
    value: {
      type: String
    }
  },
  setup(props, context) {
    const { ...rest } = context.attrs
    const listVisible = ref(false)
    const itemWrapper = ref<HTMLDivElement>(null)
    const selectorInput = ref<HTMLInputElement>(null)
    const wrapper = ref<HTMLInputElement>(null)
    const classes = classMaker('BUI-Selector')
    const scrollHeight = ref(0)

    const initScroll = computed(() => {
      const itemIndex = (props.sourceData.indexOf(props.value) - 1)
      const itemHeight = 14 * 3
      return itemIndex < 0 ? 0 : -(itemHeight * itemIndex)
    })


    const openList = async () => {
      document.addEventListener('click', selectorClickDocument)
      await nextTick(() => {
        listVisible.value = true
      })
    }
    const closeList = async () => {
      document.removeEventListener('click', selectorClickDocument)
      await nextTick(() => {
        listVisible.value = false
      })
    }



    const onClickItem = async (item) => {
      context.emit('update:value', item)
      await nextTick(() => {
        closeList()
      })
    }

    const selectorClickDocument = (e) => {
      if ((wrapper.value &&
        wrapper.value === e.target) || (wrapper.value && wrapper.value.contains(e.target))
      ) { return }
      if (itemWrapper.value &&
        (itemWrapper.value === e.target || itemWrapper.value.contains(e.target))
      ) { return }
      closeList()
    }

    onMounted(() => {
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', selectorClickDocument)
    })
    return {
      rest, classes, itemWrapper, wrapper, selectorInput, scrollHeight,
      openList, closeList, onClickItem,
      listVisible, initScroll
    }
  }
}
</script>