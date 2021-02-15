<template>
  <div class="Tabs-demo">
    <h1>Tabs 组件</h1>
    <div class="Tabs-demo__section">
      <Demo :component="TabsDemo1"></Demo>
      <Demo :component="TabsDemo2"></Demo>
    </div>
  </div>
</template>

<script>

import Demo from '../Demo.vue'
import TabsDemo1 from './Tabs.demo1.vue'
import TabsDemo2 from './Tabs.demo2.vue'

export default {
  name: "TabsDemo",
  components:{
    Demo
  },
  setup(){
    return {
      TabsDemo1,
      TabsDemo2
    }
  }
};
</script>

<style lang="scss" scope>
.Tabs-demo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
    }
  }
}
</style>
