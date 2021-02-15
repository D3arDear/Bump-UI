<template>
  <div class="demo">
    <h2>{{ component.__sourceCodeTitle }}</h2>
    <div class="demo-component">
      <component :is="component" />
    </div>
    <div class="demo-actions">
      <Button textButton level="primary" @click="hideCode" v-if="codeVisible"
        >隐藏代码</Button
      >
      <Button textButton level="primary" @click="showCode" v-else
        >查看代码</Button
      >
    </div>
    <div class="demo-code" v-if="codeVisible">
      <pre v-highlightjs="html">
        <code class="vue"></code>
      </pre>
    </div>
  </div>
</template>
  
<script lang="ts">
import Button from "./lib/Button/Button.vue";
import "highlight.js/styles/atom-one-dark.css";
import { computed, ref } from "vue";

export default {
  components: {
    Button,
  },
  props: {
    component: {
      type: Object,
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
  
<style scoped>
code {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
}
.demo {
  width: 100%;
}
</style>