<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" :ref="toastRef">
      <div class="message">
        <slot v-if="!enableHTML"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>
      <div class="line" :ref="lineRef"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">{{
        closeButton.text
      }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
export default {
  name: "BUI-Toast",
  props: {
    autoClose: {
      type: [Boolean, Number],
      default: 3,
      validator: (value: boolean | number) => {
        return value === false || typeof value === "number";
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

    const updateStyles = async () => {
      console.log('调用了')
      await nextTick(() => {
        console.log('来看Line了')
        console.log(line.value)
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
      execAutoClose();
    })
    const toastClasses = computed(() => {
      return { [`position-${position}`]: true };
    })

    const execAutoClose = () => {
      if (autoClose) {
        setTimeout(() => {
          close();
        }, typeof autoClose === 'number' && autoClose * 1000);
      }
    }
    return {
      toastClasses,
      toastRef,
      lineRef
    }
  },
  methods: {
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
<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: #222020c2;
$box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
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
.wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  $animation-duration: 250ms;
  z-index: 21;
  &.position-top {
    top: 0;
    .toast {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $animation-duration;
    }
  }
  &.position-bottom {
    bottom: 0;
    .toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $animation-duration;
    }
  }
  &.position-middle {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .toast {
      animation: fade-in $animation-duration;
    }
  }
}
.toast {
  animation: fadeIn 1s;
  .message {
    padding: 8px 0;
  }
  line-height: 1.8;
  border-radius: 2px;
  color: #eeeeee;
  padding: 0 16px;
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-min-height;
  display: flex;
  align-items: center;
  background: $toast-bg;
  box-shadow: $box-shadow;
  .close {
    flex-shrink: 0;
    padding-left: 16px;
    cursor: pointer;
  }
  .line {
    border-left: 1px solid #151515;
    margin-left: 16px;
  }
}
</style>


