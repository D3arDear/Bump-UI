<demo>
默认 Switch 开关
</demo>

<template>
  <div class="switchSection">
    <Switch v-model:value="bool" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Switch from "../lib/Switch/Switch.vue";
export default {
  components: { Switch },
  setup() {
    const bool = ref(false);
    return { bool };
  },
}
</script>

<style lang="scss" scoped>
</style>