<template>
  <div class="switch">
    <h1>Switch组件</h1>
    <div class="switchSection">
      <h2>默认 Switch 开关</h2>
      <Switch v-model:value="bool1" />
    </div>
    <div class="switchSection">
      <h2>扁平 Switch 开关</h2>
      <Switch v-model:value="bool2" flat />
    </div>
    <div class="switchSection">
      <h2>复古开关</h2>
      <Switch v-model:value="bool3" retro />
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { ref } from "vue";
import Switch from "../lib/Switch/Switch.vue";
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

<style lang="scss">
.switch {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .switchSection {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
