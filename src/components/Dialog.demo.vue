<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <h2>默认</h2>
      <section>
        <Dialog></Dialog>
      </section>
    </div>
  </div>
</template>

<script>
import Dialog from '../components/lib/Dialog/Dialog.vue'
export default {
  name: "DialogDemo",
  components:{
    Dialog
  }
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
