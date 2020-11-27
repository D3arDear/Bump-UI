<template>
  <header class="Topnav">
    <div class="logo">LOGO</div>
    <ul class="menu">
      <li>菜单1</li>
      <li>菜单2</li>
    </ul>
  </header>
</template>

<script lang="ts">
export default {
  name: "Topnav",
};
</script>

<style lang="scss" scoped>
.Topnav {
  display: flex;
  justify-content: space-between;
  background: #f2f2f2;
  align-items: center;
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
