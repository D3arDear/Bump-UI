<template>
  <teleport to="body">
    <transition :name="classes('animation', '', 'slide-fade')">
      <template v-if="visible">
        <div :class="[classes('wrapper', '', '')]">
          <div :class="[classes('modal', '', '')]">
            <div :class="[classes('modal-content', '', '')]">
              <header :class="[classes('modal-content', 'header', '')]">
                <slot name="title"></slot>
                <Button
                  @click="close"
                  level="primary"
                  rounded
                  textButton
                  :icon="{ name: 'exit', right: false }"
                />
              </header>
              <main :class="[classes('modal-content', 'main', '')]">
                <slot name="content"></slot>
              </main>
              <footer :class="[classes('modal-content', 'footer', '')]">
                <Button
                  :class="[classes('modal-content', 'footer-action', '')]"
                  level="primary"
                  @click="okCallback"
                >
                  {{ ok.text ? `${ok.text}` : "ok" }}
                </Button>
                <Button
                  :class="[classes('modal-content', 'footer-action', '')]"
                  @click="cancelCallback"
                  >{{ cancel.text ? `${cancel.text}` : "cancel" }}</Button
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
import { PropType } from 'vue';
interface IokButton {
  text: string;
  callback: () => void | false | true
}
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
      type: Object as PropType<IokButton>,
      default: {
        text: 'ok',
        callback: undefined,
      }
    },
    cancel: {
      type: Object as PropType<IokButton>,
      default: {
        text: 'ok',
        callback: undefined,
      }
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
    const okCallback = () => {
      if (props.ok.callback?.() !== false) {
        close();
      }
    };
    const cancelCallback = () => {
      props.cancel.callback?.();
      close();
    };
    return { classes, close, onClickOverlay, cancelCallback, okCallback };
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