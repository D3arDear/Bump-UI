<template>
  <article class="markdown-body" v-html="content"></article>
</template>

<script lang="ts">
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

<style lang="scss" scope>
@import "highlight.js/styles/atom-one-dark-reasonable.css";
h1,
h2,
h3 {
  font-weight: normal;
}
pre {
  max-width: calc(100vw - 40px);
}
</style>
