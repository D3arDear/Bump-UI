<template>
  <div :class="classes('', '', '')">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { onMounted, provide, reactive, ref, } from 'vue';
import CollapseItem from './Collapse.item.vue'
import EventBus from '../common/eventBus'
import { classMaker } from '../common/classMaker'

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
    const classes = classMaker('BUI-Collapse')

    provide("EventBus", eventBus);
    eventBus.emit("update:selected", selected.value);

    const eventHandler = (data) => {
      const { methods, name } = data
      if (props.single) {
        const newSelected = methods === 'open' ? [name] : []
        context.emit('update:selected', newSelected)
        selected.value = newSelected
        eventBus.emit("update:selected", newSelected);
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
      classes
    }
  }
};
</script>
<style lang="scss">
@import "../style/theme.scss";
.BUI-Collapse {
  width: 100%;
  padding: 16px;
  background: $--color--background;
  border-radius: $--border-radius--default;
  @include shadow($light-direction, $--color--background, $--blur-range-0);
}
</style>
