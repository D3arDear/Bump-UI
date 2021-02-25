<template>
  <div :class="[classes('', '', ''), toastClasses]">
    <div :class="classes('', 'toast', '')" :ref="toastRef">
      <div :class="classes('', 'toast-message', '')">
        <slot v-if="!enableHTML"></slot>
        <div v-else v-html="context.slots.default()[0]"></div>
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
      autoClose,
      context
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
        }, (typeof this.autoClose === 'number' ? this.autoClose : 3) * 1000);
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


