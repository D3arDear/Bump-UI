<template>
  <div @click="toggle">
    <SwitchNormal v-if="!retro" :flat="flat" :value="value" v-model:value="value" />
    <SwitchRetro v-if="retro" :value="value" v-model:value="value" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import SwitchNormal from "./Switch.normal.vue";
import SwitchRetro from "./Switch.retro.vue";
export default {
  name: "Switch",
  components: { SwitchNormal, SwitchRetro },
  props: {
    value: Boolean,
    flat: {
      type: Boolean,
      default: false,
    },
    retro: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const toggle = () => {
      console.log("点击了");
      context.emit("update:value", !props.value);
    };
    return { toggle };
  },
};
</script>

<style lang="scss" scoped></style>
