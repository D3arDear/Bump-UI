<template>
  <div class="dialog-demo">
    <h1>Dialog 组件</h1>
    <div class="dialog-demo__section">
      <Demo :component="DialogDemo1" />
      <Demo :component="DialogDemo2" />
    </div>
  </div>
</template>

<script lang="ts">
import Demo from '../Demo.vue'
import DialogDemo1 from './Dialog.demo1.vue'
import DialogDemo2 from './Dialog.demo2.vue'
export default {
  name: "DialogDemo",
  components: {
    Demo
  },
  setup() {
    return {
      DialogDemo1,
      DialogDemo2
    };
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
