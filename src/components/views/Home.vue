<template>
  <div>
    <Topnav></Topnav>
    <main class="banner">
      <h1>Bump UI</h1>
      <h2>一个表达凹凸的 UI</h2>
      <p class="actions">
        <a href="">GitHub</a>
        <router-link to="doc">开始</router-link>
      </p>
    </main>
  </div>
</template>

<script lang="ts">
import Topnav from "./common/Topnav.vue";

export default {
  components: { Topnav },
  name: "Home",
};
</script>

<style lang="scss" scoped></style>
