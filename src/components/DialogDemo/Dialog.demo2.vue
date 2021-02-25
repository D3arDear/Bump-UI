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
<script lang="ts" setup>
import Button from "../../lib/Button/Button.vue";
import { openDialog } from "../../lib/Dialog/openDialog";
const showDialog = () => {
  openDialog({
    title: "标题",
    content: "你好",
    closeOnClickOverlay: true,
    ok: {
      text: '确认',
      callback: () => {
        console.log("ok");
      }
    },
    cancel: {
      text: '取消',
      callback: () => {
        console.log("cancel");
      }
    },
  })
}
</script>