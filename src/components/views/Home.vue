<template>
  <div>
    <Topnav></Topnav>
    <main class="banner">
      <h1>Bump UI</h1>
      <h2>一个表达凹凸的 UI</h2>
      <p class="actions">
        <div class="textDiv">
          <Button class="actionButton" :icon="{name:'github',right:false}" surfaceStyle="convex" @click="clickGithub">Github</Button>
          <Button class="actionButton" :icon="{name:'start',right:true}" surfaceStyle="convex" @click="clickStart"> 开始 </Button>
        </div>
      </p>
    </main>
  </div>
</template>

<script lang="ts">
import Button from '../../lib/Button/Button.vue';
import { router } from '../../router';
import Topnav from "./common/Topnav.vue";

export default {
  components: { Topnav, Button },
  name: "Home",
  setup() {
    const clickGithub = () => {
      window.open('https://github.com/BrendanZhang/Bump-UI')
    }
    const clickStart = () => {
      router.push({ path: 'doc' })
    }
    return {
      clickGithub,
      clickStart
    }
  }
};
</script>

<style lang="scss">
@import "../../lib/style/theme.scss";
.textDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  .actionButton {
    margin: 0 20px;
  }
}
.banner {
  background: url("../../assets/BumpVue-banner.png") no-repeat center;
  background-size: cover;

  height: calc(100vh - 50px);
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin: 0;
  }
  .actions {
    margin-top: 30px;
    /* a {
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
    } */
  }
}
</style>
