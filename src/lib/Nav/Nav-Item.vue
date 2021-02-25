<template>
  <div
    class="BUI-Nav-Item"
    :class="{ selected, vertical }"
    @click="onClick"
    :data-name="name"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { AppContext, inject, SetupContext } from 'vue';
import { ref } from 'vue';
import { EventBusType } from '../common/eventBus';
export default {
  name: "ZealotNavItem",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const selected = ref(false)
    const eventBus = inject<EventBusType>("EventBus");
    const root = inject<AppContext>('root')
    const vertical = inject<boolean>('vertical')

    eventBus.emit('addItem', context);

    const onClick = () => {
      eventBus.emit('resetNamePath', [])
      eventBus.emit('updateParentNamePath', [])
      eventBus.emit("update:selected", props.name);
    }

    return {
      vertical,
      selected,
      eventBus,
      onClick
    };
  },
};
</script>
