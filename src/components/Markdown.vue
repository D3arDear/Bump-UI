<template>
  <article class="markdown-body" v-html="content"></article>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "Markdown",
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
@import "highlight.js/styles/atom-one-dark-reasonable.css";
pre {
  max-width: calc(100vw - 40px);
}
</style>
