<template>
  <div>
    <template v-if="animationEnabled">
      <transition name="BUI-Slides-animation" mode="out-in">
        <div class="BUI-Slides-item" v-if="visible" :class="{ reverse }">
          <slot></slot>
        </div>
      </transition>
    </template>
  </div>
</template>
<script lang='ts'>
import { computed, inject, onUpdated, ref } from 'vue';
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
    const animationEnabled = ref(false)

    const visible = computed(() => {
      return selected.value === props.name
    })
    eventBus.on('update:reverse', (payload: boolean) => {
      reverse.value = payload
    })
    eventBus.on('update:selected', (payload) => {
      selected.value = payload
    })
    onUpdated(() => {
      animationEnabled.value = true
    })

    return {
      selected,
      reverse,
      visible,
      props,
      animationEnabled
    }
  },
};
</script>
<style lang="scss">
.BUI-Slides-animation {
  &-leave-active {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.5s;
  }
  &-enter {
    transform: translateX(100%);
  }
  &-enter.reverse {
    transform: translateX(-100%);
  }
  &-leave-to {
    transform: translateX(-100%);
  }
  &-leave-to.reverse {
    transform: translateX(100%);
  }
}
</style>
