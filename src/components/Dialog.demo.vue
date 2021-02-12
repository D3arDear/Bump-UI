<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <h2>默认</h2>
      <section>
        <Button level="primary" textButton @click="toggle">Toggle</Button>
        <Dialog :visible="v1"></Dialog>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Dialog from "../components/lib/Dialog/Dialog.vue";
import Button from "../components/lib/Button/Button.vue";
import { ref } from "vue";
export default {
  name: "DialogDemo",
  components: {
    Dialog,
    Button,
  },
  setup() {
    const v1 = ref(false);
    const toggle = () => {
      v1.value = !v1.value;
    };
    return { v1, toggle };
  },
};
</script>

<style lang="scss">
.dialog-demo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      .button {
        margin: 5px;
      }
    }
  }
}
</style>
