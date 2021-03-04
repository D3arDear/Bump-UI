<template>
  <transition name="BUI-animation--slide-left">
    <div :class="classes('Aside', '', '')" v-if="visible">
      <slot></slot>
      <button
        :class="classes('Aside', 'actions', '')"
        @click="visible = !visible"
      >
        <Icon name="exit" />
      </button>
    </div>
  </transition>
</template>
<script lang="ts">
import { ref } from 'vue';
import Button from '../Button/Button.vue'
import Icon from '../Icon.vue';
import { classMaker } from '../common/classMaker';
export default {
  name: "BUI-Aside",
  components: {
    Button,
    Icon
  },
  setup() {
    const classes = classMaker('BUI-Layout')
    const visible = ref(true)
    return {
      visible,
      classes
    }
  }
};
</script>

