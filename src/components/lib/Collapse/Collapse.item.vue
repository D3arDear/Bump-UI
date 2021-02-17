<template>
  <div :class="classes('Item', '', '')">
    <div
      :class="classes('Item', 'title', `${open ? 'open' : ''}`)"
      @click="toggle"
    >
      <span>{{ title }}</span>
      <Icon :class="classes('Item', 'title-icon')" name="right" />
    </div>
    <transition name="animation--fade" mode="out-in">
      <div :class="classes('Item', 'content', '')" v-if="open">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script lang='ts'>
import { inject, onMounted, ref, } from 'vue';
import { EventBusType } from '../common/eventBus';
import { classMaker } from '../common/classMaker';
import Icon from '../Icon.vue'

export default {
  name: "BUI-Collapse-item",
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  setup(props, context) {
    const eventBus = inject<EventBusType>("EventBus");
    const { name } = props
    const open = ref(false)
    const classes = classMaker('BUI-Collapse')

    onMounted(() => {
      eventBus.on("update:selected", names => {
        if (names.indexOf(name) >= 0) {
          open.value = true;
        } else {
          open.value = false;
        }
      });
    })
    const toggle = () => {
      if (open.value) {
        eventBus.emit('item:close', { methods: 'close', name: name })
      } else {
        eventBus.emit('item:open', { methods: 'open', name: name })
      }
    }

    return {
      open,
      toggle,
      classes
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../style/theme.scss";
.BUI-Collapse-Item {
  transition: all 300ms;
  &__title {
    color: lighten(ContrastText($--color--background), 5%);
    font-size: 16px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 8px;
    cursor: pointer;
    border-bottom: 1px solid darken($--color--background, 5%);
    transition: all 300ms;
    &-icon {
      width: 1em;
      height: 1em;
      transition: all 300ms;
    }
    &--open {
      @extend .BUI-Collapse-Item__title;
      color: $--color--primary;
      transition: all 300ms;
      border: none;
      svg {
        transform: rotate(90deg);
      }
    }
  }
  &__content {
    color: lighten(ContrastText($--color--background), 10%);
    border-bottom: 1px solid darken($--color--background, 5%);
    padding: 0 8px 16px;
  }
}
.animation--fade {
  &-enter-active,
  &-leave-active {
    opacity: 1;
    height: 100%;
    transition: all 300ms ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    height: 0;
  }
}
</style>
