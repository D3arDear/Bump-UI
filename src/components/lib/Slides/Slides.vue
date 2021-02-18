<template>
  <div
    class="z-slides"
    v-on="{
      mouseenter: onMouseEnter,
      mouseleave: onMouseLeave,
      touchstart: onTouchStart,
      touchmove: onTouchMove,
      touchend: onTouchEnd,
    }"
  >
    <div class="z-slides-window" ref="window">
      <div class="z-slides-wrapper" ref="wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="z-slides-dots">
      <span @click="onClickPrev" class="prev">
        <Icon name="left"></Icon>
      </span>
      <span
        v-for="n in childrenLength"
        :key="n"
        :data-index="n - 1"
        :class="{ active: selectedIndex === n - 1 }"
        @click="select(n - 1)"
        >{{ n }}</span
      >
      <span @click="onClickNext" class="next">
        <Icon name="right"></Icon>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Icon from "../Icon.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, provide, reactive, ref } from 'vue';
import EventBus from '../common/eventBus';
export default {
  name: "zealotSlides",
  components: {
    Icon
  },
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoPlayDelay: {
      type: Number,
      default: 3000
    }
  },
  setup(props, context) {
    const childrenLength = ref(0)
    const lastSelectedIndex = ref(undefined)
    const timerId = ref(undefined)
    const startTouch = ref(undefined)
    const wrapperRef = ref<HTMLDivElement>(null)
    const eventBus = reactive(new EventBus())
    provide("EventBus", eventBus);

    const selectedIndex = computed(() => {
      let index = names.value.indexOf(props.selected);
      return index === -1 ? 0 : index;
    })
    const names = computed(() => {
      return items.value.map(vm => vm.props.name);
    })
    const items = computed(() => {
      return context.slots.default().filter(vm => vm.type.name === "BUI-Slides-item")
    })


    const onClickPrev = () => {
      select(selectedIndex.value - 1);
    }
    const onClickNext = () => {
      select(selectedIndex.value + 1);
    }
    const onMouseEnter = () => {
      pause();
    }
    const onMouseLeave = () => {
      toggleAutoPlay();
    }
    const onTouchStart = (e) => {
      pause();
      if (e.touches.length > 1) {
        return;
      }
      startTouch.value = e.touches[0];
    }
    const onTouchMove = () => { }

    const onTouchEnd = (e) => {
      let endTouch = e.changedTouches[0];
      let { clientX: x1, clientY: y1 } = startTouch.value;
      let { clientX: x2, clientY: y2 } = endTouch;
      let horizon = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let deltaY = Math.abs(y2 - y1);
      let slope = horizon / deltaY;
      if (slope > 2) {
        if (x2 > x1) {
          select(selectedIndex.value - 1);
        } else {
          select(selectedIndex.value + 1);
        }
      }
      nextTick(() => {
        toggleAutoPlay();
      })
    }

    const getSelected = () => {
      let first = items.value[0];
      return props.selected || first.props.name;
    }
    const pause = () => {
      window.clearTimeout(timerId.value);
      timerId.value = undefined;
    }
    const updateChildren = () => {
      let selected = getSelected();
      items.value.forEach(vm => {
        let reverse =
          selectedIndex.value > lastSelectedIndex.value ? false : true;
        if (timerId.value) {
          if (
            lastSelectedIndex.value === items.value.length - 1 &&
            selectedIndex.value === 0
          ) {
            reverse = false;
          }
          if (
            lastSelectedIndex.value === 0 &&
            selectedIndex.value === items.value.length - 1
          ) {
            reverse = true;
          }
        }
        eventBus.emit('update:reverse', reverse)
        nextTick(() => {
          eventBus.emit('update:selected', selected)
        });
      });
    }
    onUpdated(() => {
      updateChildren();
    })
    onBeforeUnmount(() => {
      pause()
    })

    const select = (newIndex) => {
      console.log('from', props.selected)
      lastSelectedIndex.value = selectedIndex.value;
      if (newIndex === -1) {
        newIndex = names.value.length - 1;
      }
      if (newIndex === names.value.length) {
        newIndex = 0;
      }
      context.emit("update:selected", names.value[newIndex]);
      console.log('to', names.value[newIndex])
    }

    const toggleAutoPlay = () => {
      if (timerId.value) {
        return;
      }
      let run = () => {
        let index = names.value.indexOf(getSelected());
        let newIndex = index + 1;
        select(newIndex);
        timerId.value = setTimeout(run, props.autoPlayDelay);
      };
      timerId.value = setTimeout(run, props.autoPlayDelay);
    }
    onMounted(() => {
      updateChildren();
      if (props.autoPlay) {
        toggleAutoPlay();
      }
      childrenLength.value = items.value.length;
    })

    return {
      childrenLength,
      lastSelectedIndex,
      timerId,
      select,
      startTouch,
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClickNext,
      onClickPrev
    }
  },
};
</script>
<style lang="scss" scoped>
.z-slides {
  border: 1px solid grey;
  &-window {
    overflow: hidden;
  }
  &-wrapper {
    position: relative;
  }
  &-dots {
    padding: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      width: 20px;
      height: 20px;
      display: inline-flex;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      background: #ddd;
      margin: 0 8px;
      font-size: 12px;
      &:hover {
        cursor: pointer;
      }
      &.active {
        background: #1b1b1b;
        color: #ddd;
        &:hover {
          cursor: default;
        }
      }
    }
  }
}
</style>
