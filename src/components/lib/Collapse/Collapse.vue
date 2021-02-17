<template>
  <div class="collapse">
    <slot :eventHandler="eventHandler" :name="selected"></slot>
  </div>
</template>
<script lang='ts'>
import { inject, onMounted, provide } from 'vue';
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
    provide("EventBus", new EventBus());
    const eventBus = inject<EventBusType>("EventBus");

    slots.forEach((tag) => {
      if (tag.type !== CollapseItem) {
        throw new Error("Collapse 的子标签必须是 CollapseItem");
      }
    });


    const eventHandler = (methods, name) => {
      if (props.single) {
        const newSelected = methods === 'open' ? [name] : []
        context.emit('update:selected', newSelected)
      } else {
        let selectedCopy = JSON.parse(JSON.stringify(props.selected));
        const newSelected = methods === 'open' ? selectedCopy.push(name) : selectedCopy.forEach(el => el !== name);
        context.emit('update:selected', newSelected)
      }
    }

    eventBus.on('item:close', eventHandler)
    eventBus.on('item:open', eventHandler)

    slots.forEach((tag) => {
      tag.props.names = props.selected
      tag.props.eventHandler = eventHandler
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
