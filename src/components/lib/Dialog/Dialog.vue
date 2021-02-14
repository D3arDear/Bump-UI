<template>
  <teleport to="body">
    <transition :name="classes('animation', '', 'slide-fade')">
      <template v-if="visible">
        <div :class="[classes('wrapper', '', '')]">
          <div :class="[classes('modal', '', '')]">
            <div :class="[classes('modal-content', '', '')]">
              <header :class="[classes('modal-content', 'header', '')]">
                <slot name="title"></slot>
                <Button @click="close" level="primary" textButton rounded
                  >X</Button
                >
              </header>
              <main :class="[classes('modal-content', 'main', '')]">
                <slot name="content"></slot>
              </main>
              <footer :class="[classes('modal-content', 'footer', '')]">
                <Button
                  :class="[classes('modal-content', 'footer-action', '')]"
                  level="primary"
                  @click="ok"
                  >OK</Button
                >
                <Button
                  :class="[classes('modal-content', 'footer-action', '')]"
                  @click="cancel"
                  >Cancel</Button
                >
              </footer>
            </div>
          </div>
          <div
            v-if="visible"
            :class="[classes('overlay', '', '')]"
            @click="onClickOverlay"
          ></div>
        </div>
      </template>
    </transition>
  </teleport>
</template>
  
<script lang="ts">
import { classMaker } from "../common/classMaker";
import Button from "../Button/Button.vue";
export default {
  name: "BUI-Dialog",
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
    ok: {
      type: Function,
    },
    cancel: {
      type: Function,
    },
  },
  setup(props, context) {
    const { closeOnClickOverlay } = props;

    const classes = classMaker("BUI-Dialog");
    const close = () => {
      context.emit("update:visible", false);
    };
    const onClickOverlay = () => {
      closeOnClickOverlay && close();
    };
    const ok = () => {
      if (props.ok?.() !== false) {
        close();
      }
    };
    const cancel = () => {
      props.cancel?.();
      close();
    };
    return { classes, close, onClickOverlay, cancel, ok };
  },
};
</script>

<style lang="scss">
@import "./Dialog.scss";

.BUI-Dialog-animation--fade {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.BUI-Dialog-animation--slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
    transform: translateY(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-20%);
  }
}
</style>