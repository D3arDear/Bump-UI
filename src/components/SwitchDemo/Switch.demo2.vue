<demo>
扁平 Switch 开关
</demo>
<template>
  <div class="switchSection">
    <Switch v-model:value="bool" flat />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Switch from "../lib/Switch/Switch.vue";
const bool = ref(false);
</script>

<style lang="scss" scoped>
</style>