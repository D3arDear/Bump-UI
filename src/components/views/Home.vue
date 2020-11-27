<template>
  <div>
    <header class="Topnav">
      <div class="logo"></div>
      <div class="menu"></div>
    </header>
    <main class="banner">
      <h1>Bump UI</h1>
      <h2>一个表达凹凸的 UI</h2>
      <p class="actions">
        <a href="">GitHub</a>
        <router-view to="doc">开始</router-view>
      </p>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.Topnav {
  border: 1px solid red;
}
</style>
