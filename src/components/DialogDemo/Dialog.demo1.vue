<demo>
  slot 传入内容
</demo>
<template>
  <section>
    <Button level="success" textButton @click="toggle">slot</Button>
    <Dialog v-model:visible="v" closeOnClickOverlay :ok="f1" :cancel="f2">
      <template v-slot:title>
        <h1>这里是标题</h1>
      </template>
      <template v-slot:content>
        <div>div1</div>
        <div>div2</div>
      </template>
    </Dialog>
  </section>
</template>

<script lang="ts">
import Dialog from "../lib/Dialog/Dialog.vue";
import Button from "../lib/Button/Button.vue";
import { ref } from 'vue';
export default {
  components: {
    Dialog,
    Button,
  },
  setup() {
    const v = ref(false);
    const toggle = () => {
      v.value = !v.value;
    };
    const f1 = () => {
      return false;
      // 这里是 ok 事件的回调
      // 如果返回值是 false 那么 Dialog 不会自动关闭
    };
    const f2 = () => {
      console.log('f2调用了')
    };
    return { v, toggle, f1, f2 };
  }
}

</script>

<style lang="scss" scoped>
</style>