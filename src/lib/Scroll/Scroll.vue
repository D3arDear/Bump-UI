<template>
  <div
    :class="classes('wrapper', '', '')"
    ref="parentRef"
    v-on="{
      mouseenter: onMouseEnter,
      mouseleave: onMouseLeave,
      wheel: onWheel,
      mousemove: onMouseMove,
    }"
  >
    <div
      :class="classes('', '', '')"
      ref="childRef"
      :style="{ transform: `translateY(${contentY}px)` }"
    >
      <slot></slot>
    </div>
    <transition name="BUI-animation--fade">
      <div :class="classes('', 'track', '')" v-show="scrollBarVisible">
        <div
          :class="classes('', 'bar', '')"
          ref="barRef"
          v-on="{
            mousedown: onMouseDownScrollBar,
            selectstart: onSelectStartScrollBar,
          }"
        >
          <div
            :class="classes('', 'bar', 'inner')"
            :style="{ background: barColor }"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang='ts'>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { classMaker } from '../common/classMaker';
export default {
  name: "BUI-Scroll",
  props: {
    barColor: String
  },
  setup(props, context) {
    const scrollBarVisible = ref(false)
    const isScrolling = ref(false)
    let startPosition = reactive({ x: 0, y: 0 })
    let endPosition = reactive({ x: 0, y: 0 })
    const scrollBarY = ref(0)
    const contentY = ref(0)
    const barHeight = ref(undefined)
    const parentHeight = ref(undefined)
    const mouseIn = ref(false)
    const parentRef = ref<HTMLDivElement>(null)
    const childRef = ref<HTMLDivElement>(null)
    const barRef = ref<HTMLDivElement>(null)

    const classes = classMaker('BUI-Scroll')

    const childHeight = computed(() => {
      return childRef.value.getBoundingClientRect().height
    })


    const maxScrollHeight = computed(() => {
      return parentHeight.value - barHeight.value;
    })


    const calculateScrollBarY = (delta: { y: number; }) => {
      let newValue = scrollBarY.value + delta.y;
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > maxScrollHeight.value) {
        newValue = maxScrollHeight.value;
      }
      return newValue;
    }
    const onMouseUpScrollBar = (e: any) => {
      isScrolling.value = false;
      if (!mouseIn.value) {
        scrollBarVisible.value = false
      }
    }

    const onMouseMoveScrollBar = (e: MouseEvent) => {
      if (!isScrolling.value) { return; }
      endPosition = { x: e.screenX, y: e.screenY };
      let delta = {
        x: endPosition.x - startPosition.x,
        y: endPosition.y - startPosition.y
      };
      scrollBarY.value = calculateScrollBarY(delta);
      contentY.value = -(
        (childHeight.value * scrollBarY.value) /
        parentHeight.value
      );
      startPosition = endPosition;
      barRef.value.style.transform = `translate(0px,${scrollBarY.value}px)`;
    }

    const listenToDocument = () => {
      document.addEventListener("mousemove", e => onMouseMoveScrollBar(e));
      document.addEventListener("mouseup", e => onMouseUpScrollBar(e));
    }

    const updateScrollBar = () => {
      barHeight.value = (parentHeight.value * parentHeight.value) / childHeight.value;
      barRef.value.style.height = barHeight.value + "px";
      scrollBarY.value = -(parentHeight.value * contentY.value) / childHeight.value;
      barRef.value.style.transform = `translateY(${scrollBarY.value}px)`;
    }

    const calculateContentYFromDeltaY = (deltaY: number) => {
      let newContentY = contentY.value;
      if (deltaY > 20) {
        newContentY -= 20 * 3;
      } else if (deltaY < -20) {
        newContentY -= -20 * 3;
      } else {
        newContentY -= deltaY * 3;
      }
      return newContentY;
    }
    const onWheel = (e: { deltaY: any; preventDefault: () => any; }) => {
      // 更新 contentY
      updateContentY(e.deltaY, () => e.preventDefault());
      // 更新 scrollBar
      updateScrollBar();
    }

    const calcContentYMax = () => {
      const {
        borderTopWidth,
        borderBottomWidth,
        paddingTop,
        paddingBottom
      } = window.getComputedStyle(parentRef.value);
      const NborderTopWidth = parseInt(borderTopWidth);
      const NborderBottomWidth = parseInt(borderBottomWidth);
      const NpaddingTop = parseInt(paddingTop);
      const NpaddingBottom = parseInt(paddingBottom);
      let maxHeight =
        childHeight.value -
        parentHeight.value +
        (NborderTopWidth + NborderBottomWidth + NpaddingTop + NpaddingBottom);
      return maxHeight;
    }

    const updateContentY = (deltaY: any, fn: () => any) => {
      let maxHeight = calcContentYMax();
      contentY.value = calculateContentYFromDeltaY(deltaY);
      if (contentY.value > 0) {
        contentY.value = 0;
      } else if (contentY.value < -maxHeight) {
        contentY.value = -maxHeight;
      } else {
        fn && fn();
      }
    }

    const onMouseEnter = () => {
      scrollBarVisible.value = true;
      mouseIn.value = true
    }
    const onMouseLeave = () => {
      mouseIn.value = false
      if (!isScrolling.value) scrollBarVisible.value = false;
    }
    const onMouseMove = () => {
      mouseIn.value = true
    }


    const onMouseDownScrollBar = (e: { screenX: any; screenY: any; }) => {
      isScrolling.value = true;
      let { screenX, screenY } = e;
      startPosition = { x: screenX, y: screenY };
    }
    const onSelectStartScrollBar = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
    }

    const listenToRemoteResources = () => {
      let tags = parentRef.value.querySelectorAll('img, video, audio')
      Array.from(tags).map((tag) => {
        if (tag.hasAttribute('data-BUI-listened')) { return }
        tag.setAttribute('data-BUI-listened', 'yes')
        tag.addEventListener('load', () => {
          updateScrollBar()
        })
      })
    }


    const listenToDomChange = () => {
      const targetNode = childRef.value
      const config = { attributes: true, childList: true, subtree: true };
      const callback = () => {
        listenToRemoteResources()
      }
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    }

    onMounted(() => {
      listenToDocument();
      parentHeight.value = parentRef.value.getBoundingClientRect().height;
      //  获取 maxHeight 用于限制 contentY
      updateScrollBar();
      listenToRemoteResources()
      listenToDomChange()
    })
    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", e =>
        onMouseMoveScrollBar(e)
      );
      document.removeEventListener("mouseup", e => onMouseUpScrollBar(e));
    })

    return {
      scrollBarVisible,
      isScrolling,
      startPosition,
      endPosition,
      scrollBarY,
      contentY,
      barHeight,
      parentHeight,
      childHeight,
      parentRef,
      childRef,
      barRef,
      onWheel,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onMouseDownScrollBar,
      onSelectStartScrollBar,
      classes
    };
  },
};
</script>
<style lang="scss">
@import "./Scroll.scss";
</style>