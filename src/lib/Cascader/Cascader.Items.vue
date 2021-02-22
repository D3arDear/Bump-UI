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

    console.log(props.selected)
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

<style scoped lang="scss">
@import "../style/theme.scss";
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
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
.BUI-animation--fade {
  &-enter-active,
  &-leave-active {
    opacity: 1;
    transition: all 300ms ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.BUI-Cascader-Items {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  height: 100px;
  background: $--color--background;
  border-radius: $--border-radius--default;
  box-shadow: shadow-generator(
    $light-direction,
    $--color--background,
    $--blur-range-1,
    false
  );
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: #f6f6f600;
    border-radius: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba($--color--background, 0.5);
    border-radius: 1px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #747474;
  }
  ::-webkit-scrollbar-corner {
    background: $--color--background;
  }
  &__left {
    width: auto;
    padding: 0.3em 0;
    overflow: auto;
    border-radius: $--border-radius--default;
    height: 100%;
    background: $--color--background;
    box-shadow: shadow-generator(
      $light-direction,
      $--color--background,
      $--blur-range-3,
      false
    );
  }
  &__right {
    width: auto;
    overflow: auto;
    border-radius: $--border-radius--default;
    margin-left: 1em;
    height: 100%;
    background: $--color--background;
    box-shadow: shadow-generator(
      $light-direction,
      $--color--background,
      $--blur-range-3,
      false
    );
  }
  &__label {
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    transition: all 300ms;
    color: ContrastText($--color--background);
    &.active {
      color: $--color--primary;
    }
    &:hover {
      background: darken($--color--background, 5%);
    }
    > .BUI-Cascader-Items__name {
      margin-right: 1em;
      user-select: none;
    }
    .BUI-Cascader-Items__icon {
      margin-left: auto;
      .next {
        transform: scale(0.5);
      }
      .loading {
        animation: spin 2s infinite linear;
      }
    }
  }
}
</style>