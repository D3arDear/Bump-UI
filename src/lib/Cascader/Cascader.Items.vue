<template>
  <div :class="classes('', '', '')" :style="{ height: height }">
    <div :class="classes('', 'left', '')">
      <div
        v-for="item in items"
        :class="[classes('', 'label', ''), { active: labelActive(item.name) }]"
        @click="onClickLabel(item)"
      >
        <span :class="classes('', 'name', '')">{{ item.name }}</span>
        <span :class="classes('', 'icon', '')">
          <transition name="BUI-animation--fade" mode="out-in">
            <template v-if="item.name === loadingItem.name">
              <Icon class="loading" name="loading"></Icon>
            </template>
            <template v-else>
              <Icon
                class="next"
                v-if="rightArrowVisible(item)"
                name="right"
              ></Icon>
            </template>
          </transition>
        </span>
      </div>
    </div>
    <transition name="BUI-animation--slide-bottom" mode="out-in">
      <div :class="classes('', 'right', '')" v-if="rightItems">
        <BUI-CascaderItems
          ref="right"
          :items="rightItems"
          :height="height"
          :loading-item="loadingItem"
          :load-data="loadData"
          :level="level + 1"
          :selected="selected"
          @update:selected="onUpdateSelected"
        ></BUI-CascaderItems>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, PropType, ref } from 'vue'
import Icon from '../Icon.vue'
import { classMaker } from '../common/classMaker'
interface IItems {
  name: string
}
export default {
  name: "BUI-CascaderItems",
  components: { Icon },
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
    items: {
      type: Array as PropType<IItems[]>
    },
    height: {
      type: String
    },
    loadingItem: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Array as PropType<IItems[]>,
      default: () => []
    },
    loadData: {
      type: Function
    },
    level: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const right = ref<HTMLDivElement>(null)
    const classes = classMaker('BUI-Cascader-Items')

    const rightItems = computed(() => {
      if (props.selected[props.level]) {
        let selected = props.items.filter((item) => item.name === props.selected[props.level].name)
        // @ts-ignore
        if (selected && selected[0].children && selected[0].children.length > 0) {
          // @ts-ignore
          return selected[0].children
        }
      }
    })

    const rightArrowVisible = (item) => {
      return props.loadData ? !item.isLeaf : item.children
    }


    const labelActive = (item) => props.selected.map(selectedItem => selectedItem.name).indexOf(item) >= 0;


    const onClickLabel = (item) => {
      let copy = JSON.parse(JSON.stringify(props.selected))
      copy[props.level] = item
      copy.splice(props.level + 1) // 一句话
      context.emit('update:selected', copy)
    }

    const onUpdateSelected = (newSelected) => {
      context.emit('update:selected', newSelected)
    }

    return {
      classes,
      labelActive,
      rightItems,
      rightArrowVisible,
      onClickLabel,
      onUpdateSelected,
      right
    }
  }
}
</script>
