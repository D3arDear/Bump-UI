<template>
  <div class="collapseItem">
    <div class="title" @click="toggle" :class="{ open }">{{ title }}</div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { inject, onMounted, PropType, ref, watchEffect } from 'vue';
import { EventBusType } from '../common/eventBus';
export default {
  name: "BUI-Collapse-item",
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    names: {
      type: Array as PropType<string[]>,
      required: true
    },
    eventHandler: {
      type: Function as PropType<(methods: string, name: string) => void>,
      required: true
    }

  },
  setup(props, context) {
    const { name, eventHandler } = props
    const open = ref(false)

    const eventBus = inject<EventBusType>("EventBus");
    const names = inject<string[]>("names");


    onMounted(() => {
      watchEffect(() => {
        if (names.indexOf(name) >= 0) {
          open.value = true
        } else {
          open.value = false
        }
      }, { flush: 'post' })
    })
    const toggle = () => {
      if (open.value) {
        eventBus.emit('item:close', { methods: 'close', name: name })
      } else {
        eventBus.emit('item:open', { methods: 'open', name: name })
      }
    }

    return {
      open,
      toggle
    }
  },
};
</script>
<style lang="scss" scoped>
.collapseItem {
  > .title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    cursor: pointer;
    &.open {
    }
  }
  > .content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 8px;
  }
}
</style>
