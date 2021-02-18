<template>
  <div :class="classes('', '', '')" ref="wrapper" :style="{ heightRef }">
    <div
      :class="classes('', '', `${sticky ? 'sticky' : ''}`)"
      :style="{ leftRef, widthRef, topRef }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { classMaker } from '../common/classMaker';
export default {
  name: "BUI-Sticky",
  props: {
    distance: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const classes = classMaker('BUI-Sticky')

    const sticky = ref(false)
    const leftRef = ref(undefined)
    const widthRef = ref(undefined)
    const heightRef = ref(undefined)
    const topRef = ref(undefined)
    const timerId = ref(null)
    const windowScrollHandler = ref(null)
    const wrapper = ref<HTMLDivElement>(null)

    const offsetTop = () => {
      let { top } = wrapper.value.getBoundingClientRect();
      return { top: top + window.scrollY };
    }


    const _windowScrollHandler = () => {
      let { top } = offsetTop();
      if (window.scrollY > top - props.distance) {
        let {
          height,
          left,
          width
        } = wrapper.value.getBoundingClientRect();
        heightRef.value = height + "px";
        leftRef.value = left + "px";
        widthRef.value = width + "px";
        topRef.value = props.distance + "px";
        sticky.value = true;
      } else {
        heightRef.value = undefined;
        leftRef.value = undefined;
        widthRef.value = undefined;
        topRef.value = undefined;
        sticky.value = false;
      }
    }

    onMounted(() => {
      windowScrollHandler.value = _windowScrollHandler;
      window.addEventListener("scroll", windowScrollHandler.value);
    })
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", windowScrollHandler.value);
    })

    return {
      classes,
      sticky,
      leftRef,
      widthRef,
      heightRef,
      topRef,
      timerId,
      wrapper
    };
  }
};
</script>
<style lang="scss">
.BUI-Sticky {
  &--sticky {
    position: fixed;
    z-index: 1;
  }
}
</style>
