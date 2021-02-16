<template>
  <div class="cascaderItem" :style="{ height: height }">
    <div class="left">
      <div class="label" v-for="item in items" @click="onClickLabel(item)">
        <span class="name">{{ item.name }}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <icon class="loading" name="loading"></icon>
          </template>
          <template v-else>
            <icon
              class="next"
              v-if="rightArrowVisible(item)"
              name="right"
            ></icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <gulu-cascader-items
        ref="right"
        :items="rightItems"
        :height="height"
        :loading-item="loadingItem"
        :load-data="loadData"
        :level="level + 1"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></gulu-cascader-items>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, PropType } from 'vue'
import Icon from '../Icon.vue'
interface ISelectedItem {
  name: string
  id: number
  parent_id: number
}

export default {
  name: "BUI-CascaderItems",
  components: { Icon },
  props: {
    items: {
      type: Array as PropType<ISelectedItem[]>
    },
    height: {
      type: String
    },
    loadingItem: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Array,
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
    const { selected, level, items } = props
    const rightItem = computed(() => {
      if (selected[level]) {
        let selected = items.filter((item) => item.name === selected[level].name)
        if (selected && selected[0].children && selected[0].children.length > 0) {
          return selected[0].children
        }
      }
    })
    const rightArrowVisible = (item) => {
      return props.loadData ? !item.isLeaf : item.children
    }
    const onClickLabel = (item) => {
      let copy = JSON.parse(JSON.stringify(selected))
      copy[level] = item
      copy.splice(props.level + 1) // 一句话
      context.emit('update:selected', copy)
    }
    const onUpdateSelected = (newSelected) => {
      context.emit('update:selected', newSelected)
    }

    return {
      rightItem,
      rightArrowVisible,
      onClickLabel,
      onUpdateSelected
    }
  },
}
</script>

<style scoped lang="scss">
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    height: 100%;
    padding: 0.3em 0;
    overflow: auto;
  }
  .right {
    height: 100%;
    border-left: 1px solid #ddd;
  }
  .label {
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: #666;
    }
    > .name {
      margin-right: 1em;
      user-select: none;
    }
    .icons {
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