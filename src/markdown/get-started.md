# 开始使用

请先[安装](https://bumpvue.zealot.fun/doc/install)本组件库。

在入口文件引入我的样式文件

```js
import "bump-ui/dist/lib/bump.scss";
```

之后在单文件组件中按需引入我的组件就可以使用了

```js
import { Input } from "bump-ui";
```

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
import "bump-ui/dist/lib/bump.scss";
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
