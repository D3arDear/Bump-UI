<template>
  <div :class="[classes('', '', ''), toastClasses]">
    <div :class="classes('', 'toast', '')" :ref="toastRef">
      <div :class="classes('', 'toast-message', '')">
        <slot v-if="!enableHTML"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>
      <div :class="classes('', 'line', '')" :ref="lineRef"></div>
      <div
        :class="classes('', 'close', '')"
        v-if="closeButton"
        @click="onClickClose"
      >
        {{ closeButton.text }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { classMaker } from '../common/classMaker';
export default {
  name: "BUI-Toast",
  props: {
    autoClose: {
      type: [Boolean, Number],
      default: false,
      validator: (value: boolean | number) => {
        return value !== false || typeof value === "number";
      }
    },
    closeButton: {
      type: Object,
      default: () => ({
        text: "关闭",
        callback: undefined
      })
    },
    enableHTML: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "top",
      validator: (value: string) => {
        return ["top", "bottom", "middle"].indexOf(value) >= 0;
      }
    }
  },
  setup(props, context) {
    const { position, autoClose } = props

    const line = ref<HTMLDivElement>(null)
    const toast = ref<HTMLDivElement>(null)

    const classes = classMaker('BUI-Toast')
    const updateStyles = async () => {
      await nextTick(() => {
        line.value.style.height = `${toast.value.getBoundingClientRect().height}px`;
      });
    }
    const toastRef = (el) => {
      toast.value = el
    }
    const lineRef = (el) => {
      line.value = el
    }

    onMounted(() => {
      updateStyles();
    })
    const toastClasses = computed(() => {
      return `position-${position}`
    })

    return {
      toastClasses,
      toastRef,
      lineRef,
      classes,
      autoClose
    }
  },
  mounted() {
    this.execAutoClose();
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.onClickClose();
        }, this.autoClose * 1000);
      }
    },
    close() {
      this.$el.remove();
      this.$emit("close");
      this.$destroy;
    },
    log() { },
    onClickClose() {
      if (this.closeButton && typeof this.closeButton.callback === "function") {
        this.closeButton.callback(this); // this === toast 实例
      } else {
        this.close();
      }
    }
  }
};
</script>
<style lang="scss">
@import "../style/theme.scss";
$font-size: $--font--size--default;
$toast-min-height: 40px;
$toast-bg: rgba($--color--background, 0.95);
$box-shadow: shadow-generator(
  $light-direction,
  $--color--background,
  $--blur-range-1
);

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.BUI-Toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  $animation-duration: 300ms;
  z-index: 31;
  &__close {
    display: inline-flex;
    min-height: $toast-min-height;
    min-width: $toast-min-height;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: $--color--primary;
    cursor: pointer;
  }
  &__line {
    width: 1px;
    margin-left: 1em;
    @include shadow(
      $light-direction,
      darken($--color--background, 5%),
      $--blur-range-5,
      true
    );
  }
  &.position-top {
    top: 0;
    .BUI-Toast__toast {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $animation-duration;
    }
  }
  &.position-bottom {
    bottom: 0;
    .BUI-Toast__toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $animation-duration;
    }
  }
  &.position-middle {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .BUI-Toast__toast {
      animation: fade-in $animation-duration;
    }
  }
}
.BUI-Toast__toast {
  animation: fadeIn 1s;
  &-message {
    padding: 8px 0 8px 1em;
  }
  line-height: 1.8;
  border-radius: 8px;
  color: ContrastText($--color--background);
  padding: 0;
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-min-height;
  display: flex;
  align-items: center;
  background: $toast-bg;
  box-shadow: $box-shadow;
}
</style>


