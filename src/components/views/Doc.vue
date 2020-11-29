<template>
  <div>
    <Topnav></Topnav>
    <div class="content">
      <aside v-if="asideVisible">
        <ul>
          <li>Switch 组件</li>
          <li>Button 组件</li>
          <li>Dialog 组件</li>
          <li>Tabs 组件</li>
        </ul>
      </aside>
      <main :class="{ asideVisible: asideVisible }">主内容</main>
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
  aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 0;
    background: #f8f8f8;
    box-shadow: 10px 10px 30px #d3d3d3, -10px -10px 30px #ffffff;
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
      padding: 0;
      margin-right: 50px;
      li {
        width: 8em;
        margin: 10px 30px 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.5em 16px;
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
        background: #f8f8f8;
        box-shadow: -2px -2px 4px rgba($color: #ffffff, $alpha: 0.5),
          2px 2px 4px rgba($color: #000000, $alpha: 0.2);
      }
    }
  }
  main.asideVisible {
    margin-left: 208px;
  }
}
</style>
