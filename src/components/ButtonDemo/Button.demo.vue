<template>
  <div class="button-demo">
    <h1>Button 组件</h1>
    <Demo :component="ButtonDemo1" />
    <Demo :component="ButtonDemo2" />
    <Demo :component="ButtonDemo3" />
    <Demo :component="ButtonDemo4" />
    <Demo :component="ButtonDemo5" />
    <Demo :component="ButtonDemo6" />
    <Demo :component="ButtonDemo7" />
    <Demo :component="ButtonDemo8" />
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import ButtonDemo1 from "./Button.demo1.vue";
import ButtonDemo2 from "./Button.demo2.vue";
import ButtonDemo3 from "./Button.demo3.vue";
import ButtonDemo4 from "./Button.demo4.vue";
import ButtonDemo5 from "./Button.demo5.vue";
import ButtonDemo6 from "./Button.demo6.vue";
import ButtonDemo7 from "./Button.demo7.vue";
import ButtonDemo8 from "./Button.demo8.vue";
export default {
  name: "ButtonDemo",
  components: { Demo },
  setup() {
    return {
      ButtonDemo1,
      ButtonDemo2,
      ButtonDemo3,
      ButtonDemo4,
      ButtonDemo5,
      ButtonDemo6,
      ButtonDemo7,
      ButtonDemo8,
    };
  },
};
</script>

<style lang="scss" scoped>
.button-demo {
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
