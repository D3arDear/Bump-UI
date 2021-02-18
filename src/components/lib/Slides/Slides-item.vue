<template>
  <transition name="BUI-Slides-animation">
    <div class="BUI-Slides-item" v-if="visible" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>
<script lang='ts'>
import { computed, inject, ref } from 'vue';
import { EventBusType } from '../common/eventBus';
export default {
  name: "BUI-Slides-item",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const eventBus = inject<EventBusType>("EventBus");
    const selected = ref(undefined)
    const reverse = ref(false)
    const visible = computed(() => {
      return selected.value === props.name
    })
    eventBus.on('update:reverse', (payload: boolean) => {
      reverse.value = payload
    })
    eventBus.on('update:selected', (payload) => {
      selected.value = payload
    })
    return {
      selected,
      reverse,
      visible,
      props
    }
  },
};
</script>
<style lang="scss">
.BUI-Slide-animation-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.BUI-Slide-animation-enter-active,
.BUI-Slide-animation-leave-active {
  transition: all 0.5s;
}
.BUI-Slide-animation-enter {
  transform: translateX(100%);
}
.BUI-Slide-animation-enter.reverse {
  transform: translateX(-100%);
}
.BUI-Slide-animation-leave-to {
  transform: translateX(-100%);
}
.BUI-Slide-animation-leave-to.reverse {
  transform: translateX(100%);
}
</style>
