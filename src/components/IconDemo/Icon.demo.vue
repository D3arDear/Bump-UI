<template>
  <div class="icon-demo">
    <h1>Icon 组件</h1>
    <div class="icon-demo__section">
      <Demo :component="IconDemo1">
        <p>Icon 组件接受 name 属性，渲染 name 相应的图标</p>
      </Demo>
    </div>
  </div>
</template>

<script lang="ts">
import Demo from '../Demo.vue'
import IconDemo1 from './Icon.demo1.vue'
export default {
  name: 'IconDemo',
  setup() {
    return { IconDemo1, Demo }
  }
}
</script>

<style lang="scss">
.icon-demo {
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
      .button {
        margin: 5px;
      }
    }
  }
}
</style>
