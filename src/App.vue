<template>
  <header>
    <router-link to="/">home</router-link>
    <router-link to="/button">button</router-link>
  </header>
  <hr />
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import Test from "./components/test.vue";

export default {
  name: "App",
  components: {},
};
</script>
