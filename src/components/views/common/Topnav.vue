<template>
  <header class="Topnav" :class="{ asideVisible: asideVisible }">
    <div class="logo" @click="toggleMenu">LOGO</div>
    <ul class="menu">
      <li>菜单1</li>
      <li>菜单2</li>
    </ul>
  </header>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
export default {
  name: "Topnav",
  setup() {
    const asideVisible = inject<Ref<boolean>>("xxx");
    console.log("topnav 获取到 asideVisible 为: " + asideVisible.value);
    const toggleMenu = () => {
      console.log("点击了");
      asideVisible.value = !asideVisible.value;
      console.log(asideVisible.value);
    };
    return { toggleMenu, asideVisible };
  },
};
</script>

<style lang="scss" scoped>
.Topnav.asideVisible {
  padding-left: 208px;
}
.Topnav {
  display: flex;
  justify-content: space-between;
  background: #f8f8f8;
  align-items: center;
  height: 50px;
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
}
</style>
