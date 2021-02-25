<template>
  <div>
    <Topnav></Topnav>
    <main class="banner">
      <h1>Bump UI</h1>
      <h2>一个表达凹凸的 UI</h2>
      <p class="actions">
        <div class="textDiv"></div>
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

<style lang="scss">
@import "../../lib/style/theme.scss";
.textDiv {
  width: 100px;
  height: 100px;
}
.banner {
  background: #f2f2f2;
  padding: 80px 20px;
  h1 {
    margin: 0;
  }
  .actions {
    margin-top: 30px;
    a {
      text-align: center;
      font-size: 16px;
      margin: 20px;
      text-decoration: none;
      color: #666;
      background: #f2f2f2;
      padding: 10px 20px;
      height: 2em;
      border-radius: 1em;
      border-top: 0.25px solid rgba($color: #ffffff, $alpha: 0.5);
      border-left: 0.25px solid rgba($color: #ffffff, $alpha: 0.5);
      box-shadow: -2px -2px 3px rgba($color: #ffffff, $alpha: 0.5),
        2px 2px 3px rgba($color: #000000, $alpha: 0.2);
    }
  }
}
</style>
