<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{ result() || "&nbsp;" }}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :items="source"
        class="popover"
        :loadData="loadData"
        :loading-item="loadingItem"
        :height="popoverHeight"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></cascader-items>
    </div>
  </div>
</template>

<script lang='ts'>
import CascaderItems from './Cascader.Items.vue'
// import ClickOutside from '../common/clickOutside'
import { computed, PropType, ref } from 'vue'

interface ISelectedItem {
  name: string
  id: number
  parent_id: number
}

export default {
  name: 'BUI-Cascader',
  components: { CascaderItems },
  // directives: { ClickOutside },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    },
    selected: {
      type: Array as PropType<ISelectedItem[]>,
      default: () => { return [] }
    },
    loadData: {
      type: Function
    }
  },
  setup(props, context) {

    const popoverVisible = ref(false)
    const loadingItem = ref({})
    const open = () => {
      popoverVisible.value = true
    }
    const close = () => {
      popoverVisible.value = false
    }
    const toggle = () => {
      if (popoverVisible.value === false) {
        open()
      } else {
        close()
      }
    }

    const onUpdateSelected = (newSelected) => {
      context.emit('update:selected', newSelected)
      let lastItem = newSelected[newSelected.length - 1]
      let simplest = (children, id) => {
        return children.filter(item => item.id === id)[0]
      }
      let complex = (children, id) => {
        let noChildren = []
        let hasChildren = []
        children.forEach(item => {
          if (item.children) {
            hasChildren.push(item)
          } else {
            noChildren.push(item)
          }
        })
        let found = simplest(noChildren, id)
        if (found) {
          return found
        } else {
          found = simplest(hasChildren, id)
          if (found) { return found }
          else {
            for (let i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id)
              if (found) {
                return found
              }
            }
            return undefined
          }
        }
      }
      let updateSource = (sourceResult) => {
        loadingItem.value = {}
        let copy = JSON.parse(JSON.stringify(props.source))
        let toUpdate = complex(copy, lastItem.id)
        toUpdate.children = sourceResult
        context.emit('update:source', copy)
      }
      if (!lastItem.isLeaf && props.loadData) {
        props.loadData(lastItem, updateSource) // 回调:把别人传给我的函数调用一下
        // 调回调的时候传一个函数,这个函数理论应该被调用
        loadingItem.value = lastItem
      }
    }
    const result = () => {
      return props.selected.map((item) => item.name).join('/')
    }

    return {
      loadingItem,
      onUpdateSelected,
      result,
      toggle
    }
  }
}
</script>

<style scoped lang="scss">
.cascader {
  display: inline-block;
  position: relative;
  .trigger {
    background: white;
    height: 20px;
    display: inline-flex;
    align-items: center;
    padding: 0 1em;
    min-width: 10em;
    border: 1px solid #666;
    border-radius: 8px;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    display: flex;
    margin-top: 8px;
    z-index: 1;
  }
}
</style>