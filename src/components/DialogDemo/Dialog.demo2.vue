<demo>
  一键开启 Dialog
</demo>
<template>
  <section>
    <Button level="primary" textButton @click="showDialog"
      >One Button Show Dialog.</Button
    >
  </section>
</template>
<script lang="ts">
import Button from "../lib/Button/Button.vue";
import { openDialog } from "../lib/Dialog/openDialog";
export default {
  components: {
    Button
  },
  setup() {
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
    }
    return { showDialog }
  }
}
</script>