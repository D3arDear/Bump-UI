# Bump-UI

![GitHub](https://img.shields.io/github/license/BrendanZhang/Bump-UI) [![npm version](https://badge.fury.io/js/bump-ui.svg)](https://badge.fury.io/js/bump-ui)

Neumorphism(新拟物风) 的飞机图曾在 dribbble 上掀起一阵复古思潮。
时尚果然是轮回的，曾经的 UI 界面为了指导用户使用，尽可能的拟物。
随后 UI 进入了扁平化时代，七个年头后，整体低饱和度以及柔和的阴影高光的拟物风又被拿出来讨论。
这种有厚度的卡片在 “扁平” 了这么久后确实能让人眼前一亮，组件的凹凸表达不同状态也能给用户一定的确认反馈。

- 然而过多的组件装饰挤占了大量空间，整体画面过于“素” 可能找不到重点
- 低饱和度的整体色调让主色和强调色的选择捉襟见肘
- 适用范围稍窄：在工具类（相机、音乐播放器）应用中比较合适，在复杂且强交互应用中（文本编辑，电商等）缺点被放大。
  - 组件一旦密集排布，同等级交互组件难以让人找到重点
  - 低辨识度让用户产生视觉疲劳
- 在 X Y 轴上的动画不好处理，动画多为 Z 轴动画

Bump UI 组件库是我对这种风格的尝试和思考，也是我学习 Vue 3 新特性的过程。整个项目基于 Vue 3 和 Typescript，通过 SCSS 文件控制主题样式（用户可覆盖），大部分阴影由 `@function @minxin` 生成（阴影深度依赖于背景色）。

由于还没有找到易用性和美观的最佳实践，不建议将此 UI 库用于生产环境。但如果可以讨论该风格的可行性，或是想学习讨论 vue3 的系特性。那么这个库还是值得一看的。

[Preview Page](https://brendanzhang.github.io/Bump-UI/#/)

# 安装

打开终端运行下列命令：

npm:

```bash
npm install bump-ui
```

yarn:

```bash
yarn add bump-ui
```

# 开始使用

请先安装本组件库。

在入口文件引入我的样式文件

```js
import "bump-ui/dist/lib/bump.scss";
```

之后在单文件组件中按需引入

## Vue 单文件组件

代码示例：

```vue
<template>
  <div>
    <Button>按钮</Button>
  </div>
</template>
<script>
import { Button } from "bump-ui";
export default {
  components: { Button },
};
</script>
```

## 更改主题

本组件库依照 B.E.M 命名，用户可以替换样式

### 更改全局变量

`userTheme.scss:`

```scss
$--color--background: #444;

@import "bump-ui/dist/lib/bump.scss";
```

之后在入口文件中引入 `userTheme.scss`

本库提供以下全局变量供用户替换

```scss
$light-direction: topLeft !default;

$--border-radius--default: 8px !default;

$--blur-range: 8px !default;
$--blur-range-0: 12px !default;
$--blur-range-1: 10px !default;
$--blur-range-2: 8px !default;
$--blur-range-3: 6px !default;
$--blur-range-4: 4px !default;
$--blur-range-5: 2px !default;

$--font--size--big: 16px !default;
$--font--size--default: 14px !default;
$--font--size--medium: 13px !default;
$--font--size--small: 12px !default;
$--font--size--pager: $--font--size--default !default;

$--color--text--black: #292929 !default;
$--color--text--black-0: #292929 !default;
$--color--text--black-1: #363636 !default;
$--color--text--black-2: #464646 !default;
$--color--text--white: #eee !default;

$--color--background: #f0f1f3 !default;
$--color--default: $--color--background !default;
$--color--primary: #ff9e5d !default;
$--color--secondary: #ffd6f3 !default;
$--color--danger: #f56c6c !default;
$--color--info: #909399 !default;
$--color--success: #c5e063 !default;
$--color--warning: #e6803c !default;
$--color--disabled: #ddd !default;
$--color--checked: #ff9e5d !default;
$--color--pager: #e6803c !default;
$--color--error: #f85555 !default;

$--common--block-padding: 8px !default;
```
