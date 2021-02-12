<template>
  <template v-if="visible">
    <div :class="[classes('wrapper', '', '')]">
      <div :class="[classes('modal', '', '')]">
        <div :class="[classes('modal-content', '', '')]">
          <header :class="[classes('modal-content', 'header', '')]">
            标题
          </header>
          <main :class="[classes('modal-content', 'main', '')]">
            <p>第一行字</p>
            <p>第二行字</p>
          </main>
          <footer :class="[classes('modal-content', 'footer', '')]">
            <Button
              :class="[classes('modal-content', 'footer-action', '')]"
              level="primary"
              >OK</Button
            >
            <Button :class="[classes('modal-content', 'footer-action', '')]"
              >Cancel</Button
            >
          </footer>
        </div>
      </div>
    </div>
  </template>
</template>
  
<script lang="ts">
import { classMaker } from "../common/classMaker";
import Button from "../Button/Button.vue";
export default {
  name: "BUI-Dialog",
  components: {
    Button,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const classes = classMaker("BUI-Dialog");
    return { classes };
  },
};
</script>

<style lang="scss">
@import "./Dialog.scss";
</style>