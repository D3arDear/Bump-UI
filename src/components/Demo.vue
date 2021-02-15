<template>
  <div class="demo">
    <h2>{{ component.__sourceCodeTitle }}</h2>
    <slot></slot>
    <div class="demo-component">
      <component :is="component" />
    </div>
    <div class="demo-actions">
      <Button
        @click="hideCode"
        v-if="codeVisible"
        size="mini"
        class="button"
        :linearColor="{
          colors: ['#FE6B8B', '#FF8E53'],
          angle: '45',
        }"
        :icon="{ name: 'down', right: false }"
      >
        隐藏代码
      </Button>
      <Button
        @click="showCode"
        v-else
        size="mini"
        class="button"
        :linearColor="{
          colors: ['#FE6B8B', '#FF8E53'],
          angle: '45',
        }"
        :icon="{ name: 'right', right: false }"
      >
        查看代码
      </Button>
    </div>
    <transition name="animation--slide-fade" mode="out-in">
      <div class="demo-code" v-if="codeVisible">
        <pre v-highlightjs="html">
        <code class="vue"></code>
      </pre>
      </div>
    </transition>
  </div>
</template>
  
<script lang="ts">
import Button from "./lib/Button/Button.vue";
import "highlight.js/styles/atom-one-dark.css";
import { Component, computed, PropType, ref } from "vue";

export default {
  components: {
    Button,
  },
  props: {
    component: {
      type: Object as PropType<Component>,
      required: true,
    },
  },
  setup(props) {
    const codeVisible = ref(false);
    const html = computed(() => props.component.__sourceCode);
    const showCode = () => (codeVisible.value = true);
    const hideCode = () => (codeVisible.value = false);
    return {
      html,
      codeVisible,
      showCode,
      hideCode,
    };
  },
};
</script>
  
<style lang="scss" scoped>
code {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  padding: 20px;
  border-radius: 8px;
}
.demo {
  width: 100%;
  &-code {
    max-width: calc(100vw - 30px);
  }
  &-component {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  &-actions {
    padding-top: 10px;
    border-top: 1px dotted #bbb;
    display: flex;
    justify-content: flex-end;
  }
}
h2 {
  margin: 40px 0 20px 0;
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
    transform: translateY(-2%);
  }
}
</style>