<template>
  <div class="icon-demo">
    <h1>Icon 组件</h1>
    <div class="icon-demo__section">
      <Demo :component="IconDemo1">
        <p>
          Icon 组件接受 name 属性，渲染 name 相应的图标，图标的 fill 由当前
          color 决定
        </p>
      </Demo>
    </div>
    <AttrTable title="Scroll Attributes" :sourceData="iconAttr" />
  </div>
</template>

<script lang="ts">
import AttrTable from '../AttrTable.vue';
import Demo from '../Demo.vue'
import IconDemo1 from './Icon.demo1.vue'
export default {
  name: 'IconDemo',
  setup() {
    const iconAttr = [
      {
        id: 0,
        attr: 'name',
        content: "接受 name 属性决定使用什么图标",
        type: 'string',
        option: "github / exit / menu / doubleLeft / doubleRight / upload / dots / info / error / loading / setting / download / down / left / thumbs-up / right / up",
        default: '',
        required: 'true',
        description: 'fill 属性默认和当前 color 或包含块的 color 一致'
      },
    ]
    return { IconDemo1, Demo, AttrTable, iconAttr }
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
