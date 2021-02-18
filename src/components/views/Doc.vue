<template>
  <div class="contentWrapper">
    <Sticky class="topnav">
      <Topnav class="topnav"></Topnav>
    </Sticky>
    <div class="content">
      <aside v-if="asideVisible">
        <!-- <div class="handle"></div> -->
        <Scroll
          :style="{
            height: 'calc(100vh - 50px)',
            width: '208px',
          }"
        >
          <h2>文档</h2>
          <ul>
            <li>
              <router-link to="/doc/intro">介绍</router-link>
            </li>
            <li>
              <router-link to="/doc/install">安装</router-link>
            </li>
            <li>
              <router-link to="/doc/get-started">开始使用</router-link>
            </li>
          </ul>
          <h2>组件列表</h2>
          <ul>
            <li>
              <router-link to="/doc/switch"> Switch </router-link>
            </li>
            <li>
              <router-link to="/doc/button"> Button </router-link>
            </li>
            <li>
              <router-link to="/doc/icon"> Icon </router-link>
            </li>
            <li>
              <router-link to="/doc/Popover"> Popover </router-link>
            </li>
            <li>
              <router-link to="/doc/toast"> Toast </router-link>
            </li>
            <li>
              <router-link to="/doc/sticky"> Sticky </router-link>
            </li>
            <li>
              <router-link to="/doc/dialog"> Dialog </router-link>
            </li>
            <li>
              <router-link to="/doc/tabs"> Tabs </router-link>
            </li>
            <li>
              <router-link to="/doc/collapse"> Collapse </router-link>
            </li>
            <li>
              <router-link to="/doc/scroll"> Scroll </router-link>
            </li>
            <li>
              <router-link to="/doc/slide"> Slide </router-link>
            </li>
            <li>
              <router-link to="/doc/table"> Table × </router-link>
            </li>
            <li>
              <router-link to="/doc/cascader"> Cascader × </router-link>
            </li>
          </ul>
        </Scroll>
      </aside>
      <main :class="{ asideVisible: asideVisible }">
        <div class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="animation--slide-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
import Topnav from "./common/Topnav.vue";
import Scroll from '../lib/Scroll/Scroll.vue'
import Sticky from '../lib/Sticky/Sticky.vue';

export default {
  components: { Topnav, Scroll, Sticky },
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    return { asideVisible };
  },
  name: "Doc",
};
</script>

<style lang="scss" scoped>
@import "../../components/lib/style/theme.scss";

.contentWrapper {
  background: $--color--background;
  .topnav {
    z-index: 30;
  }
}
.content {
  height: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  background: $--color--background;
  aside {
    position: fixed;
    top: 54px;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 1;
    background-color: $--color--background;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 0;
    border-right: 1px solid lighten($--color--background, 10%);
    /* box-shadow: shadowD-oneWay(
      right,
      $--color--background,
      $--blur-range-4,
      dark
    ); */
    .handle {
      position: absolute;
      top: calc(50vh - 25px);
      left: 190px;
      height: 50px;
      width: 6px;
      border-radius: 2px;
      background: lighten($--color--background, 10%);
      box-shadow: shadow-generator(
        $light-direction,
        $--color--background,
        $--blur-range-3
      );
    }
    h2 {
      margin: 10px 25px;
    }
    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      list-style-type: none;
      padding: 0 10px;
      width: 208px;
      li {
        width: 100%;
        margin: 10px 0px;
        a {
          text-decoration: none;
          color: ContrastText($--color--background);
          font-size: 14px;
          cursor: pointer;
          width: 8em;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0.5em 1em;
          height: 3em;
          // border-top-right-radius: 1em;
          // border-bottom-right-radius: 1em;
          transition: all 300ms;
          &:hover {
            box-shadow: shadowD-oneWay(
              bottom,
              $--color--checked,
              $--blur-range-0,
              light
            );
          }
          &.active {
            box-shadow: 4px 5px 5px -5px rgba($color: #000, $alpha: 0.1);
          }
        }
        a.router-link-active {
          color: $--color--checked;
          box-shadow: shadowD-oneWay(
            bottom,
            $--color--checked,
            $--blur-range-4,
            light
          );
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
    background: $--color--background;
    .main-content {
      width: 960px;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex: 1;
      @media (min-width: 1024px) {
        width: 960px;
      }
      @media (max-width: 1024px) {
        width: 700px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    &.asideVisible {
      margin-left: 208px;
    }
  }
  @media (max-width: 768px) {
    main.asideVisible {
      margin-left: 0;
    }
  }
}
.animation--slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
    transform: translateY(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-2%);
  }
}
</style>
