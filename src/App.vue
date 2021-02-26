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
    const asideVisible = ref(width <= 900 ? false : true);
    provide("asideVisible", asideVisible);
    router.afterEach(() => {
      if (width <= 900) {
        asideVisible.value = false;
      }
    });
  },
  components: {},
};
</script>

