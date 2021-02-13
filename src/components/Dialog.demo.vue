<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <h2>默认</h2>
      <section>
        <Button level="primary" textButton @click="toggle">Toggle</Button>
        <Dialog v-model:visible="v1"></Dialog>
      </section>
      <h2>传入函数及点击浮层关闭</h2>
      <section>
        <Button level="success" textButton @click="toggle2"
          >Passing Function</Button
        >
        <Dialog
          v-model:visible="v2"
          closeOnClickOverlay
          :ok="f1"
          :cancel="f2"
        ></Dialog>
      </section>
      <h2>slot 传入内容</h2>
      <section>
        <Button level="success" textButton @click="toggle3">slot</Button>
        <Dialog v-model:visible="v3" closeOnClickOverlay :ok="f1" :cancel="f3">
          <template v-slot:title>
            <h1>这里是标题</h1>
          </template>
          <template v-slot:content>
            <div>div1</div>
            <div>div2</div>
          </template>
        </Dialog>
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
    const v2 = ref(false);
    const v3 = ref(false);
    const toggle = () => {
      v1.value = !v1.value;
    };
    const toggle2 = () => {
      v2.value = !v2.value;
    };
    const toggle3 = () => {
      v3.value = !v3.value;
    };
    const f1 = () => {
      return false;
    };
    const f2 = () => {};
    return { v1, v2, v3, toggle, toggle2, toggle3, f1, f2 };
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
