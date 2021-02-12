<template>
  <div>
    <Topnav></Topnav>
    <div class="content">
      <aside v-if="asideVisible">
        <div class="handle"></div>
        <ul>
          <li>
            <router-link to="/doc/switch"> Switch </router-link>
          </li>
          <li>
            <router-link to="/doc/button"> Button </router-link>
          </li>
          <li>
            <router-link to="/doc/dialog"> Dialog </router-link>
          </li>
          <li>
            <router-link to="/doc/tabs"> Tabs </router-link>
          </li>
        </ul>
      </aside>
      <main :class="{ asideVisible: asideVisible }"><router-view /></main>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
import Topnav from "./common/Topnav.vue";

export default {
  components: { Topnav },
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    console.log("doc 获取到 asideVisible 为: " + asideVisible.value);
    return { asideVisible };
  },
  name: "Doc",
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  aside {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 1;
    background-color: #f8f8f8;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 0;
    border-right: 1px solid #fff;
    box-shadow: 20px 0px 20px -20px rgba($color: #000, $alpha: 0.1);
    .handle {
      position: absolute;
      top: calc(50vh - 25px);
      left: 190px;
      height: 50px;
      width: 6px;
      border-radius: 2px;
      background: #ddd;
      box-shadow: -2px -2px 2px rgba($color: #ffffff, $alpha: 0.5),
        1px 1px 2px rgba($color: #000000, $alpha: 0.2),
        0 0 10px rgba($color: #000000, $alpha: 0.1);
    }
    h2 {
      margin: 0;
      margin-left: 10px;
    }
    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      list-style-type: none;
      padding: 0 10px;
      li {
        width: 100%;
        margin: 10px 40px 10px 20px;
        a {
          text-decoration: none;
          color: #666;
          cursor: pointer;
          width: 8em;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0.5em 16px;
          // border-top-right-radius: 1em;
          // border-bottom-right-radius: 1em;
          &.active {
            box-shadow: 4px 5px 5px -5px rgba($color: #000, $alpha: 0.1);
          }
        }
      }
    }
  }
  main {
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: #eef1f3;
    &.asideVisible {
      margin-left: 208px;
    }
  }
  @media (max-width: 500px) {
    main.asideVisible {
      margin-left: 0;
    }
  }
}
</style>
