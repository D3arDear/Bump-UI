<template>
  <router-view />
</template>

<script lang="ts">
import { provide, ref } from "vue";
import { router } from "./router";
export default {
  name: "App",
  setup() {
    const width = document.documentElement.clientWidth;
    const asideVisible = ref(width <= 800 ? false : true);
    provide("asideVisible", asideVisible);
    router.afterEach(() => {
      if (width <= 800) {
        asideVisible.value = false;
      }
    });
  },
  components: {},
};
</script>

