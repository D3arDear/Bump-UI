<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <h2>slot 传入内容</h2>
      <section>
        <Button level="success" textButton @click="toggle">slot</Button>
        <Dialog v-model:visible="v1" closeOnClickOverlay :ok="f1" :cancel="f2">
          <template v-slot:title>
            <h1>这里是标题</h1>
          </template>
          <template v-slot:content>
            <div>div1</div>
            <div>div2</div>
          </template>
        </Dialog>
      </section>
      <h2>一行代码 show Dialog</h2>
      <section>
        <Button level="primary" textButton @click="showDialog"
          >One Button Show Dialog.</Button
        >
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Dialog from "..//lib/Dialog/Dialog.vue";
import Button from "../lib/Button/Button.vue";
import { openDialog } from "../lib/Dialog/openDialog";
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
    const f1 = () => {
      return false;
    };
    const f2 = () => {};
    const showDialog = () => {
      openDialog({
        title: "标题",
        content: "你好",
        closeOnClickOverlay: true,
        ok: () => {
          console.log("ok");
        },
        cancel: () => {
          console.log("cancel");
        },
      });
    };
    return { v1, toggle, f1, f2, showDialog };
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
