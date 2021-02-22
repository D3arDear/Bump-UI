<template>
  <div :class="classes('', '', '')" ref="cascader" v-click-outside="close">
    <div :class="classes('', 'trigger', '')">
      <Input
        v-model:value="result"
        readonly
        :focused="popoverVisible"
        @click="toggle"
      />
    </div>
    <transition name="BUI-animation--slide-bottom" mode="out-in">
      <div
        :class="classes('', 'popover-wrapper', '')"
        v-if="popoverVisible"
        ref="CascaderItemRef"
      >
        <CascaderItems
          :items="source"
          :class="classes('', 'popover', '')"
          :loadData="loadData"
          :loading-item="loadingItem"
          :height="popoverHeight"
          :selected="selected"
          @update:selected="onUpdateSelected"
        ></CascaderItems>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import CascaderItems from './Cascader.Items.vue'
import { computed, nextTick, PropType, ref } from 'vue'
import Input from '../Input/Input.vue'
import { classMaker } from '../common/classMaker'
interface IItems {
  name: string
}
export default {
  name: 'BUI-Cascader',
  components: { CascaderItems, Input },
  directives: {
    clickOutside: {
      beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    }
  },
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
      type: Array as PropType<IItems[]>,
      default: () => { return [] }
    },
    loadData: {
      type: Function
    }
  },
  setup(props, context) {
    const classes = classMaker('BUI-Cascader')
    const popoverVisible = ref(false)
    const loadingItem = ref({})
    const cascader = ref<HTMLDivElement>(null)
    const CascaderItemRef = ref<HTMLDivElement>(null)

    const open = async () => {
      popoverVisible.value = true
    }
    const close = async () => {
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
      classes,
      popoverVisible,
      loadingItem,
      cascader, CascaderItemRef,
      open, close, toggle, onUpdateSelected,
      result
    }
  },
}
</script>

<style lang="scss">
@import "../style/theme.scss";
$border-color: #999;
$border-radius: $--border-radius--default;
.BUI-animation--slide-bottom {
  &-enter-active,
  &-leave-active {
    opacity: 1;
    transition: all 300ms ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(10%);
  }
}
.BUI-Cascader {
  display: inline-block;
  position: relative;
  &__trigger {
    display: inline-flex;
    align-items: center;
    min-width: 10em;
  }
  &__popover-wrapper {
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