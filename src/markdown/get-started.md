# 开始使用

请先[安装](#/doc/install)本组件库。

引入我的 UI 及样式文件

```js
import { Button, Tabs, Tab, Switch, Dialog, openDialog } from "bump-ui";
import { theme } from "bump-ui";
```

就可以使用我提供的组件了。

## Vue 单文件组件

代码示例：

```vue
<template>
  <div>
    <Button>按钮</Button>
  </div>
</template>
<script>
import { Button, Tabs, Tab, Switch, Dialog, openDialog } from "bump-ui";
export default {
  components: { Button },
};
</script>
```
