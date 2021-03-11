<template>
  <header class="Topnav" :class="{ asideVisible: asideVisible }">
    <SvgIcon class="logo" />
    <ul class="menu">
      <li>
        <Button
          @click="toGithub"
          surfaceStyle="convex"
          bodyStyle="convex"
          :icon="{ name: 'github' }"
          rounded
        ></Button>
      </li>
    </ul>
    <span class="toggleAside" @click="toggleAside" v-if="menuVisible">
      <Icon name="menu" />
    </span>
  </header>
</template>

<script lang="ts">
import { inject, ref, Ref } from "vue";
import SvgIcon from './logo.vue'
import Icon from '../../../lib/Icon.vue';
import Button from '../../../lib/Button/Button.vue';
import { router } from '../../../router';
export default {
  components: {
    SvgIcon,
    Icon,
    Button
  },
  name: "Topnav",
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    const menuVisible = ref<boolean>(router.currentRoute.value.path === '/' ? false : true)

    const toggleAside = () => {
      asideVisible.value = !asideVisible.value;
    };
    const toGithub = () => {
      window.open('https://github.com/BrendanZhang/Bump-UI')
    }
    return { toggleAside, asideVisible, toGithub, menuVisible };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../lib/style/theme.scss";
.Topnav {
  z-index: 30;
}
.Topnav,
.TopNav.asideVisible {
  display: flex;
  justify-content: space-between;
  background: $--color--background;
  align-items: center;
  height: 50px;
  position: relative;
  z-index: 30;
  border-bottom: 1px solid lighten($--color--background, 10%);
  box-shadow: shadowD-oneWay(
    bottom,
    $--color--background,
    $--blur-range-4,
    dark
  );
  .mainIcon {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 800px) {
    justify-content: center;
    align-items: center;
  }
  .toggleAside {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    svg {
      color: $--color--primary;
      height: 30px;
      width: 30px;
    }
    @media (max-width: 800px) {
      display: inline-block;
    }
    &.asideVisible .toggleAside {
      padding-left: 208px;
    }
  }
  .logo {
    margin-left: 10px;
    width: 50px;
    height: 50px;
  }
  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style-type: none;
    li {
      margin: 0 10px;
    }
  }
  @media (max-width: 800px) {
    .menu {
      display: none;
    }
  }
}
</style>
