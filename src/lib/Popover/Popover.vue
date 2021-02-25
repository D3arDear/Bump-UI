<template>
  <div :class="classes('', '', '')" ref="popover">
    <transition :name="classes('animation', '', `slide-${position}`)">
      <div
        ref="contentWrapper"
        v-if="visible"
        :class="[
          classes('content', 'wrapper', ''),
          { [`position-${position}`]: true },
          popClassName,
        ]"
      >
        <slot name="content" :close="close"></slot>
      </div>
    </transition>
    <span ref="triggerWrapper" style="display: inline-block">
      <slot></slot>
    </span>
  </div>
</template>

<script lang='ts'>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { classMaker } from '../common/classMaker'
export default {
  name: "BUI-Popover",
  props: {
    popClassName: {
      type: String
    },
    position: {
      type: String,
      default: 'top',
      validator: (value: string) => {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (value: string) => {
        return ['click', 'hover'].indexOf(value) >= 0
      }
    },
    container: {
      type: Element
    }
  },
  setup(props, context) {
    const { trigger, container, position } = props
    const visible = ref(false)
    const popover = ref<HTMLDivElement>(null)
    const triggerWrapper = ref<HTMLDivElement>(null)
    const contentWrapper = ref<HTMLDivElement>(null)

    const classes = classMaker('BUI-Popover')

    onMounted(() => {
      addPopoverListeners()
    })
    onBeforeUnmount(() => {
      putBackContent()
      removePopoverListeners()
    })
    const openEvent = computed(() => {
      if (trigger === 'click') {
        return 'click'
      } else {
        return 'mouseenter'
      }
    })

    const cloesEvent = computed(() => {
      if (trigger === 'click') {
        return 'click'
      } else {
        return 'mouseleave'
      }
    })

    const addPopoverListeners = () => {
      if (trigger === 'click') {
        popover.value.addEventListener('click', onClick)
      } else {
        popover.value.addEventListener('mouseenter', open)
        popover.value.addEventListener('mouseleave', close)
      }
    }

    const removePopoverListeners = () => {
      if (trigger === 'click') {
        popover.value.removeEventListener('click', onClick)
      } else {
        popover.value.removeEventListener('mouseenter', open)
        popover.value.removeEventListener('mouseleave', close)
      }
    }

    const putBackContent = () => {
      if (!contentWrapper.value) { return }
      popover.value.appendChild(contentWrapper.value)
    }

    const positionContent = () => {
      (container || document.body).appendChild(contentWrapper.value)
      const { width, height, top, left } = triggerWrapper.value.getBoundingClientRect()
      const { height: height2 } = contentWrapper.value.getBoundingClientRect()
      let positions = {
        top: { top: top + window.scrollY, left: left + window.scrollX, },
        bottom: { top: top + height + window.scrollY, left: left + window.scrollX },
        left: {
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX
        },
        right: {
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX + width
        },
      }
      contentWrapper.value.style.left = positions[position].left + 'px'
      contentWrapper.value.style.top = positions[position].top + 'px'
    }

    const onClickDocument = (e) => {
      if (popover.value &&
        (popover.value === e.target || popover.value.contains(e.target))
      ) { return }
      if (contentWrapper.value &&
        (contentWrapper.value === e.target || contentWrapper.value.contains(e.target))
      ) {
        return
      }
      close()
    }

    const open = async () => {
      visible.value = true
      context.emit('open')
      await nextTick(() => {
        positionContent()
        document.addEventListener('click', onClickDocument)
      })
    }

    const close = () => {
      visible.value = false
      context.emit('close')
      document.removeEventListener('click', onClickDocument)
    }
    const onClick = (event) => {
      if (triggerWrapper.value.contains(event.target)) {
        if (visible.value === true) {
          close()
        } else {
          open()
        }
      }
    }

    return {
      visible,
      popover,
      contentWrapper,
      triggerWrapper,
      close,
      position,
      classes
    }
  },

  methods: {
  }
}
</script>

