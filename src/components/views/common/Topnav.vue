<template>
  <header class="Topnav" :class="{ asideVisible: asideVisible }">
    <div class="logo">LOGO</div>
    <ul class="menu">
      <li>菜单1</li>
      <li>菜单2</li>
    </ul>
    <span class="toggleAside" @click="toggleAside"></span>
  </header>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
export default {
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
.toggleAside .Topnav.asideVisible {
  padding-left: 208px;
}
.Topnav {
  display: flex;
  justify-content: space-between;
  background: #f8f8f8;
  align-items: center;
  height: 50px;
  position: relative;
  @media (max-width: 500px) {
    justify-content: center;
    align-items: center;
  }
  .toggleAside {
    width: 24px;
    height: 24px;
    background: black;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    @media (max-width: 500px) {
      display: inline-block;
    }
  }
  .logo {
    margin: 10px;
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
