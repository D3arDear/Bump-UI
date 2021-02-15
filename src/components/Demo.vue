<template>
  <div class="demo">
    <h2>{{ component.__sourceCodeTitle }}</h2>
    <div class="demo-component">
      <component :is="component" />
    </div>
    <div class="demo-actions">
      <Button @click="hideCode" v-if="codeVisible">隐藏代码</Button>
      <Button @click="showCode" v-else>查看代码</Button>
    </div>
    <div class="demo-code" v-if="codeVisible">
      <pre class="language-html" v-html="html" />
    </div>
  </div>
</template>
  
<script lang="ts">
import marked from "marked";
import Button from "./lib/Button/Button.vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { onMounted, ref } from "vue";

export default {
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const codeVisible = ref(false);
    const html = ref(null);
    onMounted(() => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
      });
      html.value = marked(props.component.__sourceCode);
    });

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
</style>