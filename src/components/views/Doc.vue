<template>
  <div class="contentWrapper">
    <Sticky class="topnav">
      <Topnav></Topnav>
    </Sticky>
    <div class="content">
      <transition name="BUI-animation--fade">
        <div class="blackWrapper" v-if="asideVisible" @click="closeAside"></div>
      </transition>
      <transition name="BUI-animation--slide-left">
        <aside v-if="asideVisible">
          <!-- <div class="handle"></div> -->
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
              <router-link to="/doc/layout"> Layout </router-link>
            </li>
            <li>
              <router-link to="/doc/grid"> Grid </router-link>
            </li>
            <li>
              <router-link to="/doc/switch"> Switch </router-link>
            </li>
            <li>
              <router-link to="/doc/button"> Button </router-link>
            </li>
            <li>
              <router-link to="/doc/Input"> Input </router-link>
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
              <router-link to="/doc/pager"> Pager </router-link>
            </li>
            <li>
              <router-link to="/doc/table"> Table </router-link>
            </li>
            <li>
              <router-link to="/doc/cascader"> Cascader × </router-link>
            </li>
          </ul>
        </aside>
      </transition>
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
import Scroll from '../../lib/Scroll/Scroll.vue'
import Sticky from '../../lib/Sticky/Sticky.vue';

export default {
  components: { Topnav, Scroll, Sticky },
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    const closeAside = () => {
      asideVisible.value = false;
    };
    return { asideVisible, closeAside };
  },
  name: "Doc",
};
</script>

<style lang="scss" scoped>
@import "../../lib/style/theme.scss";

.contentWrapper {
  background: $--color--background;
  .topnav {
    position: relative;
    z-index: 30;
  }
}
.content {
  height: 100%;
  min-height: calc(100vh - 50px);
  margin: 0;
  position: relative;
  background: $--color--background;
  .blackWrapper {
    position: fixed;
    z-index: 10;
    top: 50px;
    right: 0;
    bottom: 0;
    width: calc(100vw - 200px);
    height: 100vh;
    background: rgba($--color--background, 0.7);
    @media (min-width: 800px) {
      display: none;
    }
  }
  aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    z-index: 10;
    background-color: $--color--background;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 200px;
    padding: 60px 0 10px 0;
    border-right: 1px solid lighten($--color--background, 10%);
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 1em;
      background-color: rgba(50, 50, 50, 0.3);
    }
    ::-webkit-scrollbar-track {
      border-radius: 1em;
      background-color: rgba(50, 50, 50, 0.1);
    }
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
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex: 1;
      @media (min-width: 1200px) {
        width: 900px;
      }
      @media (max-width: 1200px) {
        width: 800px;
      }
      @media (max-width: 1024px) {
        width: 700px;
      }
      @media (max-width: 1024px) {
        width: 500px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    &.asideVisible {
      margin-left: 200px;
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
