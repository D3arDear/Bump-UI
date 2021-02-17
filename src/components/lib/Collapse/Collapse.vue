<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { onMounted, provide, reactive, ref, } from 'vue';
import CollapseItem from './Collapse.item.vue'
import EventBus from '../common/eventBus'

export default {
  name: "BUI-Collapse",
  props: {
    single: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array
    }
  },
  setup(props, context) {
    const slots = context.slots.default()
    const eventBus = reactive(new EventBus())
    const selected = ref(props.selected)

    provide("EventBus", eventBus);
    eventBus.emit("update:selected", selected.value);

    slots.forEach((tag) => {
      if (tag.type !== CollapseItem) {
        throw new Error("Collapse 的子标签必须是 CollapseItem");
      }
    });

    const eventHandler = (data) => {
      const { methods, name } = data
      console.log('里面改之前', props.selected)
      if (props.single) {
        const newSelected = methods === 'open' ? [name] : []
        context.emit('update:selected', newSelected)
      } else {
        let selectedCopy = JSON.parse(JSON.stringify(props.selected));
        if (methods === 'open') { selectedCopy.push(name) } else { selectedCopy = selectedCopy.filter(el => el !== name) }
        context.emit('update:selected', selectedCopy)
        selected.value = selectedCopy
        eventBus.emit("update:selected", selectedCopy);
      }
    }

    eventBus.on('item:close', eventHandler)
    eventBus.on('item:open', eventHandler)

    onMounted(() => {
    })
    return {
      eventHandler
    }
  }
};
</script>
<style lang="scss" scoped>
.collapse {
  background: #fafafa;
  border-radius: 2px;
}
</style>
