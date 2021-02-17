<template>
  <header class="Topnav" :class="{ asideVisible: asideVisible }">
    <div class="logo"></div>
    <ul class="menu">
      <li>菜单1</li>
      <li>菜单2</li>
    </ul>
    <span class="toggleAside" @click="toggleAside">
      <Icon name="menu" />
    </span>
  </header>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
import SvgIcon from './logo.vue'
import Icon from '../../lib/Icon.vue';
export default {
  components: {
    SvgIcon,
    Icon
  },
  name: "Topnav",
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    const toggleAside = () => {
      asideVisible.value = !asideVisible.value;
    };
    return { toggleAside, asideVisible };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../components/lib/style/theme.scss";
.Topnav,
.TopNav.asideVisible {
  display: flex;
  justify-content: space-between;
  background: $--color--background;
  align-items: center;
  height: 50px;
  position: relative;
  z-index: 20;
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
  @media (max-width: 500px) {
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
      height: 30px;
      width: 30px;
    }
    @media (max-width: 500px) {
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
    background: url("./logo.png") no-repeat;
    background-size: 100% 100%;
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
  @media (max-width: 500px) {
    .menu {
      display: none;
    }
  }
}
</style>
