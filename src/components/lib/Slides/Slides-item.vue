<template>
  <transition name="BUI-Slides-animation">
    <div class="BUI-Slides-item" v-if="visible" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>
<script lang='ts'>
import { computed, ref } from 'vue';
export default {
  name: "BUI-Slides-item",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const selected = ref(undefined)
    const reverse = ref(false)
    const visible = computed(() => {
      selected.value = props.name
    })
    return {
      selected,
      reverse,
      visible
    }
  },
};
</script>
<style lang="scss">
BUI-Slide-animation-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
BUI-Slide-animation-enter-active,
BUI-Slide-animation-leave-active {
  transition: all 0.5s;
}
BUI-Slide-animation-enter {
  transform: translateX(100%);
}
BUI-Slide-animation-enter.reverse {
  transform: translateX(-100%);
}
BUI-Slide-animation-leave-to {
  transform: translateX(-100%);
}
BUI-Slide-animation-leave-to.reverse {
  transform: translateX(100%);
}
</style>
