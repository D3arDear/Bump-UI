<template>
  <div>
    <h1>Switch组件</h1>
    <Switch v-model:value="bool1" />
    <Switch v-model:value="bool2" flat />
    <Switch v-model:value="bool3" retro />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Switch from "./lib/Switch/Switch.vue";
export default {
  name: "SwitchDemo",
  components: { Switch },
  setup() {
    const bool1 = ref(false);
    const bool2 = ref(false);
    const bool3 = ref(false);
    return { bool1, bool2, bool3 };
  },
};
</script>

<style></style>
