<template>
  <div class="demo">
    <h2>{{ component.__sourceCodeTitle }}</h2>
    <div class="demo-description">
      <slot></slot>
    </div>
    <div class="demo-wrapper">
      <div class="demo-component">
        <component :is="component" />
      </div>
      <div
        :class="`demo-actions${codeVisible ? '--active' : ''}`"
        @click="toggleCode"
        v-on="{
          mouseenter: actionHoverEnter,
          mouseleave: actionHoverLeave,
        }"
      >
        <transition name="animation--slide-right" mode="out-in">
          <div v-if="codeVisible">
            <transition name="animation--slide-right" mode="out-in">
              <Icon v-if="!actionHover" class="iconButton" name="up" />
              <span v-else>
                <Icon class="iconButton" name="up" />
                <span class="iconText">隐藏代码</span>
              </span>
            </transition>
          </div>
          <div v-else>
            <transition name="animation--slide-right" mode="out-in">
              <Icon v-if="!actionHover" class="iconButton" name="down" />
              <span v-else>
                <Icon class="iconButton" name="down" />
                <span class="iconText">显示代码</span>
              </span>
            </transition>
          </div>
        </transition>
      </div>
      <transition name="animation--fade" mode="out-in">
        <div class="demo-code" v-if="codeVisible">
          <pre v-highlightjs="html">
            <code class="vue"></code>
          </pre>
        </div>
      </transition>
    </div>
  </div>
</template>
  
<script lang="ts">
import Icon from '../lib/Icon.vue'
import "highlight.js/styles/atom-one-dark.css";
import { Component, computed, onMounted, PropType, ref } from "vue";

export default {
  components: {
    Icon,
  },
  props: {
    component: {
      type: Object as PropType<Component>,
      required: true,
    },
    defaultVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const codeVisible = ref(false);
    const actionHover = ref(false);
    const html = computed(() => props.component.__sourceCode);
    const toggleCode = () => (codeVisible.value = !codeVisible.value);
    const actionHoverEnter = () => (actionHover.value = true);
    const actionHoverLeave = () => (actionHover.value = false);

    onMounted(() => {
      if (props.defaultVisible) {
        codeVisible.value = true;
      }
    })
    return {
      html,
      codeVisible,
      toggleCode,
      actionHover,
      actionHoverEnter,
      actionHoverLeave
    };
  },
};
</script>
  
<style lang="scss" scoped>
@import "../lib/style/_variables.scss";
@import "../lib/style/helper.scss";
.demo {
  width: 100%;
  transition: all 300ms;
  &-description {
    color: #666666;
    p {
      color: #666666;
    }
  }
  &-wrapper {
    margin-top: 20px;
    border-radius: $--border-radius--default;
    padding: 5px;
    @include shadow(
      $light-direction,
      $--color--background,
      $--blur-range-5,
      true
    );
  }
  &-code {
    max-width: calc(100vw - 30px);
    background: #292c34;
    border-radius: $--border-radius--default;
    @include shadow($light-direction, #292c34, $--blur-range-1, true);
    code {
      background: none;
      font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
      padding: 20px;
    }
  }
  &-component {
    padding: 20px;
    margin-bottom: 5px;
    border-radius: 8px;
  }
  &-actions {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 300ms;
    border-radius: $--border-radius--default;
    cursor: pointer;
    color: #f77c3a;
    font-size: 14px;
    text-align: center;
    height: 36px;
    background: darken($--color--background, 2%);
    span {
      display: inline-flex;
      font-size: 14px;
      margin: 0;
      height: 16px;
      svg {
        height: 16px;
        width: 16px;
      }
      .iconText {
        height: 16px;
        font-size: 14px;
      }
    }
    svg + span {
      margin-left: 0.5em;
    }
    &:hover {
      background: darken($--color--background, 5%);
    }
    &--active {
      @extend .demo-actions;
      background: darken($--color--background, 5%);
      &:hover {
        background: darken($--color--background, 8%);
      }
    }
  }
}
h2 {
  margin: 40px 0 20px 0;
}
.animation--slide-right {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
    transform: translateX(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(30%);
  }
}
.animation--slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
    transform: translateY(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-5%);
  }
}
.animation--fade {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
    transform: translateY(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(3%);
  }
}
</style>