<template>
  <transition name="slide">
    <div :class="classes('Sider', '', '')" v-if="visible">
      <slot></slot>
      <button
        :class="classes('Sider', 'actions', '')"
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
  name: "BUI-Sider",
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

<style lang="scss">
@import "../style/theme.scss";
.BUI-Layout-Sider {
  position: relative;
  &__actions {
    background: none;
    position: absolute;
    top: 0;
    right: 0;
    outline: none;
    padding: 5px;
    border: none;
    cursor: pointer;
    color: ContrastText($--color--background);
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  margin-left: -200px;
}
</style>


