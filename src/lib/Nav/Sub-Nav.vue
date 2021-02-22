<template>
  <div
    class="BUI-Sub-Nav"
    :class="{ active, vertical }"
    v-click-outside="close"
  >
    <span class="BUI-Sub-Nav__label" @click="onClick">
      <slot name="title"></slot>
      <span class="BUI-Sub-Nav__icon" :class="{ open, vertical }">
        <Icon name="right"></Icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div class="BUI-Sub-Nav__popover" v-show="open" :class="{ vertical }">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <transition name="BUI-animation--slide-top">
        <div class="BUI-Sub-Nav__popover" v-show="open">
          <slot></slot>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts">
import { AppContext, computed, getCurrentInstance, inject, ref } from 'vue';
import Icon from "../Icon.vue";
import { EventBusType } from '../common/eventBus';
export default {
  directives: {
    clickOutside: {
      beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    }
  },
  components: { Icon },
  name: "ZealotSubNav",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const eventBus = inject<EventBusType>("EventBus");
    const vertical = inject<boolean>('vertical')
    const root = inject('root')
    const namePath = inject<string[]>('namePath')
    const parent = getCurrentInstance().parent;


    const open = ref(false)


    const active = computed(() => {
      return namePath.indexOf(props.name) >= 0 ? true : false;
    })
    const enter = (el, done) => {
      let { height } = el.getBoundingClientRect();
      el.style.height = 0;
      // 120
      el.getBoundingClientRect();
      // 中间卡个东西让他重新计算
      el.style.height = `${height}px`;
      //多次合并赋值
      el.addEventListener("transitionend", () => {
        done();
      });
    }

    const leave = (el, done) => {
      let { height } = el.getBoundingClientRect();
      el.style.height = `${height}px`;
      el.getBoundingClientRect();
      el.style.height = 0;
      el.addEventListener("transitionend", () => {
        done();
      });
    }

    const afterLeave = (el) => {
      el.style.height = "auto";
    }

    const afterEnter = (el) => {
      el.style.height = "auto";
    }

    const onClick = () => {
      open.value = !open.value;
    }
    const close = () => {
      open.value = false;
    }
    const updateNamePath = () => {
      const newNamePath = [props.name, ...namePath]
      eventBus.emit('update:namePath', newNamePath)
      if (parent.proxy.updateNamePath) {
        parent.proxy.updateNamePath();
      } else {
        // this.root.namePath=[]
      }
    }

    return {
      open,
      vertical,
      eventBus,
      root,
      active, enter, afterLeave, afterEnter, leave, onClick, close, updateNamePath,
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "../style/theme.scss";
.BUI-animation--slide-top {
  &-enter-active,
  &-leave-active {
    opacity: 1;
    transition: all 300ms ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-20%);
  }
}

.BUI-Sub-Nav {
  position: relative;
  border-radius: $--border-radius--default;
  &:not(.vertical) {
    &.active {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid darken($--color--background, 10%);
        width: 100%;
      }
    }
  }
  &__label {
    padding: 10px 20px;
    display: block;
    border-radius: $--border-radius--default;
  }
  &__icon {
    display: none;
  }
  &__popover {
    margin-top: 8px;
    background: $--color--background;
    position: absolute;
    top: 100%;
    left: 0;
    box-shadow: shadow-generator(
      $light-direction,
      $--color--background,
      $--blur-range-4,
      false
    );
    white-space: nowrap;
    border-radius: $--border-radius--default;
    font-size: $--font--size--default;
    color: $--color--primary;
    min-width: 8em;
    transition: all 0.3s;
    &.vertical {
      position: static;
      border-top: 1px solid darken($--color--background, 10%);
      border-bottom: 1px solid darken($--color--background, 10%);
      transition: all 0.3s;
      overflow: hidden;
    }
  }
}
.BUI-Sub-Nav .BUI-Sub-Nav {
  &.active {
    &::after {
      display: none;
    }
  }
  .BUI-Sub-Nav__popover {
    top: 0;
    left: 100%;
    margin-left: 8px;
    &.vertical {
      margin-left: 0;
    }
  }
  .BUI-Sub-Nav__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .BUI-Sub-Nav__icon {
    display: inline-flex;
    margin-left: 1em;
    transition: transform 0.3s;
    svg {
      fill: $--color--primary;
    }
    &.vertical {
      transform: rotate(90deg);
      &.open {
        transform: rotate(270deg);
      }
    }
    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>