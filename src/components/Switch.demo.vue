<template>
  <div>
    <Switch v-model:value="bool1" />
    <Switch v-model:value="bool2" flat />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Switch from "./lib/Switch.vue";
export default {
  name: "SwitchDemo",
  components: { Switch },
  setup() {
    const bool1 = ref(false);
    const bool2 = ref(false);
    return { bool1, bool2 };
  },
};
</script>

<style></style>
