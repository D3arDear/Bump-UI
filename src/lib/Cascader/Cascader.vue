<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger">
      <Input
        v-model:value="result"
        readonly
        :focused="popoverVisible"
        @click="toggle"
      />
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

<script lang="ts">
import CascaderItems from './Cascader.Items.vue'
import ClickOutside from '../common/click-outside.js'
import { computed, ref } from 'vue'
import Input from '../Input/Input.vue'
export default {
  name: 'BUI-Cascader',
  components: { CascaderItems, Input },
  directives: { ClickOutside },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    },
    inputLabel: {
      type: String
    },
    selected: {
      type: Array,
      default: () => { return [] }
    },
    loadData: {
      type: Function
    }
  },
  setup(props, context) {
    const popoverVisible = ref(false)
    const loadingItem = ref({})
    const cascader = ref<HTMLDivElement>(null)

    const open = () => {
      popoverVisible.value = true
    }
    const close = () => {
      popoverVisible.value = false
    }

    const toggle = () => {
      if (popoverVisible.value === true) {
        close()
      } else {
        open()
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
      let updateSource = (result) => {
        loadingItem.value = {}
        let copy = JSON.parse(JSON.stringify(props.source))
        let toUpdate = complex(copy, lastItem.id)
        toUpdate.children = result
        context.emit('update:source', copy)
      }
      if (!lastItem.isLeaf && props.loadData) {
        props.loadData(lastItem, updateSource) // 回调:把别人传给我的函数调用一下
        // 调回调的时候传一个函数,这个函数理论应该被调用
        loadingItem.value = lastItem
      }
    }
    const result = computed(() => {
      return props.selected.map((item) => item.name).join('/')
    })

    return {
      popoverVisible,
      loadingItem,
      cascader,
      open, close, toggle, onUpdateSelected,
      result
    }
  },
}
</script>

<style scoped lang="scss">
@import "../style/theme.scss";
$input-height: 32px;
$border-color: #999;
$border-radius: 8px;
.cascader {
  display: inline-block;
  position: relative;
  .trigger {
    height: $input-height;
    display: inline-flex;
    align-items: center;
    min-width: 10em;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    margin-top: 8px;
    z-index: 1;
    border-radius: $--border-radius--default;
    & + & {
      margin-left: 1em;
    }
  }
}
</style>