<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { inject, onMounted, provide, reactive } from 'vue';
import CollapseItem from './Collapse.item.vue'
import EventBus from '../common/eventBus'
import { EventBusType } from '../common/eventBus'

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
    provide("EventBus", eventBus);
    provide("names", props.selected);
    console.log(eventBus)
    slots.forEach((tag) => {
      if (tag.type !== CollapseItem) {
        throw new Error("Collapse 的子标签必须是 CollapseItem");
      }
    });


    const eventHandler = (data) => {
      const { methods, name } = data
      console.log('调用了', methods, name)
      if (props.single) {
        const newSelected = methods === 'open' ? [name] : []
        context.emit('update:selected', newSelected)
      } else {
        let selectedCopy = JSON.parse(JSON.stringify(props.selected));
        methods === 'open' ? selectedCopy.push(name) : selectedCopy.forEach(el => el !== name);
        console.log(selectedCopy)
        context.emit('update:selected', selectedCopy)
      }
    }

    eventBus.on('item:close', eventHandler)
    eventBus.on('item:open', eventHandler)

    slots.forEach((tag) => {
      tag.props.names = props.selected
      console.log(tag.props.name, tag.props)
    });
    onMounted(() => { })
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
