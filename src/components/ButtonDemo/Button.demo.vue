<template>
  <div class="button-demo">
    <h1>Button 组件</h1>
    <p>交互的基本单位</p>
    <Demo :component="ButtonDemo1">
      <p>
        这是 Button 默认属性，通过 surfaceStyle 和 bodyStyle 决定按钮凹凸形式
      </p>
    </Demo>
    <Demo :component="ButtonDemo2">
      <p>
        可以接受一个 linearColor 对象，包含 colors:string[] (required)
        两个颜色决定渐变颜色，angle:number (required)
        决定渐变角度。一般用于需要特别突出的按钮。
      </p>
    </Demo>
    <Demo :component="ButtonDemo3">
      <p>接受一个 rounded 属性，让 Button 应用圆角样式</p>
    </Demo>
    <Demo :component="ButtonDemo2_1">
      <p>接受一个 icon 对象，渲染一个图标按钮组合或图标按钮</p>
    </Demo>
    <Demo :component="ButtonDemo4">
      <p>
        接受 level 属性，为按钮添加 level 层级，level 颜色由全局样式中
        $--color--(levelName) 决定，文字颜色由等级颜色及 $--color--background
        计算得出
      </p>
    </Demo>
    <Demo :component="ButtonDemo5">
      <p>
        接受 size
        属性，决定按钮的文字大小，大($--font--size--big)，默认($--font--size--default)，中($--font--size--medium)，小($--font--size--small)，迷你($--font--size--small)
      </p>
    </Demo>
    <Demo :component="ButtonDemo6">
      <p>接受 disabled 属性，阻止按钮点击</p>
    </Demo>
    <Demo :component="ButtonDemo7">
      <p>接受 textButton 属性，使按钮应用 textButton 样式</p>
    </Demo>
    <Demo :component="ButtonDemo8">
      <p>接受 loading 属性，展示加载动画</p>
    </Demo>
  </div>
</template>

<script lang="ts">
import Demo from "../Demo.vue";
import ButtonDemo1 from "./Button.demo1.vue";
import ButtonDemo2 from "./Button.demo2.vue";
import ButtonDemo2_1 from "./Button.demo2-1.vue";
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
      ButtonDemo2_1,
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
h1 {
  margin-bottom: 10px;
}
p {
}
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
        margin: 5px 0;
      }
    }
  }
}
</style>
