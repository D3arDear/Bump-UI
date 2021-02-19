# vue3 神奇的 setup()

在使用 `this.$emit` 的时候发现的问题

- 在 `setup()` 中 `context`(setup 的第二个参数)是 vue 的执行上下文
- `setup()` 中的 `context.emit` 等价于外部( methods 生命周期钩子等)的 `this.$emit`
- 但是 `setup()` 中可以声明函数也可以返回函数，那么我们为什么还需要`methods`呢？
- 看起来`vue3`只需要`setup()`,`props`,`components`似乎就能完成大部分需求

```js
setup(){
  onBeforeMount(() => {
    console.log('beforeMount')
  })
  onMounted(() => {
    console.log('mounted')
  })
  onBeforeUpdate(() => {
    console.log('beforeUpdate')
  })
  onUpdated(() => {
    console.log('updated')
  })
  onBeforeUnmount(() => {
    console.log('beforeUnmount')
  })
  onUnmounted(() => {
    console.log('unmounted')
  })
  onErrorCaptured(() =>{
    console.log('errorCaptured')
  })
  onRenderTracked(() =>{
    console.log('renderTracked')
  })
  onRenderTriggered(() =>{
    console.log('renderTriggered')
  })
}
```

# vue3 的组件内数据和父子组件数据

## 子组件内部数据

```ts
setup(){
  const checked = ref(false)
  const toggle = ()=>{
    checked.value = !checked.value
  }
  return {checked, toggle}
}
```

- 仅组件内部进行数据改动 (仅组件内修改 checked 数据)
- 不与外界进行数据交互

## 父子组件通信

```ts
// 子组件
setup(props, context) {
  const toggle = ()=>{
    context.emit('update:value', !props.value)
  }
  return {toggle}
}
```

```html
<!-- 父组件 -->
<Switch :value="bool" @update:value="bool = $event"></Switch>
<!-- ... -->
<script>
  // ...
  setup(){
    const bool = ref(false)
    return {bool}
  }
</script>
```

- 通过 `value` 控制子组件状态
- 子组件通过向父组件发送 `update:value` 事件修改 `value`
- 父组件接收 `$event` 修改 `bool` 后 `value` 更新，子组件状态改变

### 语法糖 v-model

```html
<Switch v-model:value="bool"></Switch>
<script>
  setup(){
    const bool = ref(false)
    return {bool}
  }
</script>
```

- 效果等同于 `<Switch :value="bool" @update:value="bool=$event"></Switch>`
- 这么看来现在已经不需要 2.0 的 `.sync` 了

要使用 `v-model` 有几点要求

- 属性名任意，假定为 `something`
- 事件名必须为 `update:something`

# props 和 attrs 的区别

- props 要先声明才能取值，attrs 不用先声明
- props 不包含事件，attrs 包含
- props 没有声明的属性，会包含在 attrs 里
- props 支持 string 以外的类型 (比如 bool)，attrs 只有 string 属性 (attrs 会把标签里的 disabled 认为是空字符串)

# 如何用 JS 获取插槽的内容

```ts
const defaults = context.slots.default();
```

# 是不是偶尔想在给 props 一个 interface

我都用上了 ts 了，不能给 props 定义接口是不是太奇怪了

```html
<template>
  <!-- ... -->
</template>
<script lang="ts">
  import { PropType } from "vue";
  import { hex2rgb, rgb2hsl } from "../common/colorSwitch";
  interface ILinearColor {
    colors: string[];
    angle: number;
  }

  export default {
    inheritAttrs: false,
    props: {
      linearColor: {
        type: Object as PropType<ILinearColor>,
        required: false,
      },
    },
  };
</script>
```

```ts
Object as PropType<InterfaceYouWant>;
```

# setup() 是蛮不错的，但是我居然要 return 那么多东西

- 每次都得在`setup()`最后 `return` 一堆变量，不然外面访问不到
- 太痛苦了，能不能在定义的时候就导出

```html
<script setup>
  import Foo from "./Foo.vue";
  // 我还需要 components:{} 吗？
  import { ref } from "vue";

  const count = ref(0);
  const inc = () => {
    count.value++;
  };
</script>

<template>
  <Foo :count="count" @click="inc" />
</template>
```

- 这个特性蛮不错的，如果用户铁了心了只想在 `setup()` 里只用 `Composition API`（比如说我）
- 就相当于在编译运行时把代码放到了 setup 函数中运行，然后把导出的变量定义到上下文中，并包含在返回的对象中。
  - 但是在使用的过程中我发现我这个版本("vue": "3.0.2" )无法使用 `export`，无法指定需要导出的变量
  - 也就是我在 script setup 中定义的所有变量、函数，全部都会导出到上下文
  - 虽然不会产生命名空间的问题，但我还是认为应该选择性的导出（很多情况下一些工具函数仅会在其他函数内部调用）
    - 不过也有它的好处：我导入的组件不用写 `components:{xxx}` 直接就能用

## 甚至可以在里面定义 props 和 emit

```html
<script setup>
  const props = defineProps({
    foo: String,
  });

  const emit = defineEmit(["change", "delete"]);
</script>
```

- 你可能注意到了这时候的类型还是`String`，也就是我还不能愉快的使用 ts 类型
- 如果一定要用还是需要 `as PropType<someInterface>`
- 没关系，这时候你需要一个 `defineProps<someInterface>()`

### 甚至可以愉快的用 ts 类型

```html
<script lang="ts" setup>
  const props = defineProps<{
    foo: string;
    bar?: number;
  }>();

  const emit = defineEmit<(e: "update" | "delete", id: number) => void>();
</script>
```

关于这个支持 ts 我举双手双脚赞成

## 关于实验性特性

- 由于实验性特性可能会有不可预期的大改动(break)，所以我并没有在库中使用，而是在一些展示页面中使用 `script setup`
- 有计划在该实验性特性进入稳定版本前不久改版为 `script setup`
  - 谁不喜欢拥抱 ts 呢

# watchEffect 中更新的后没有继续监听怎么办

```ts
// 在组件更新后触发，这样你就可以访问更新的 DOM。
// 注意：这也将推迟副作用的初始运行，直到组件的首次渲染完成。
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: "post",
  }
);
```

- 如果需要在组件更新后重新运行侦听器副作用，我们可以传递带有 `flush` 选项的附加 `options` 对象 (默认为 'pre')：
- `flush` 选项还接受 `sync`，这将强制效果始终同步触发。然而，这是低效的，应该很少需要。

# <transition mode="out-in">

大部分时候，两个元素一前一后替换的的动画需要一个`out-in`

- `in-out`: 新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`: 当前元素先进行过渡，完成之后新元素过渡进入。

# 好像不能用 new Vue() 创建 eventBus 了

- `new Vue()` 无法创建实例
- `Vue.createApp({})` 创建的实例也没有 `$on` 方法

## 解决方法

### 官方推荐第三方库

- vue3-eventbus
- mitt

### 自己写一个发布订阅

```ts
interface IEventList {
  [key: string]: (any) => void;
}
export type EventBusType = {
  eventList: IEventList;
  on: (eventName: string, callback: any) => void;
  emit: (eventName: string, callback: any) => void;
  off: (eventName: string, callback: any) => void;
};

export default class EventBus {
  eventList = {};

  constructor() {
    this.eventList = {};
  }
  // 订阅
  on(eventName, callback) {
    this.eventList[eventName] = this.eventList[eventName] || [];
    this.eventList[eventName].push(callback);
  }
  // 发布
  emit(eventName, data) {
    if (this.eventList[eventName]) {
      this.eventList[eventName].forEach(function (callback) {
        callback(data);
      });
    }
  }
  off(eventName, callback) {
    if (this.eventList[eventName]) {
      for (let i = 0; i < this.eventList[eventName].length; i++) {
        if (this.eventList[eventName][i] === fn) {
          this.eventList[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}
```

之后去入口文件挂载

```ts
// main.js
import { createApp } from "vue";
import App from "./App.vue";
// ① 引入事件类
// 自己编写的或者mitt皆可
import EventBus from "lib/bus.js";
// 或者：import EventBus from 'mitt'
const $bus = new EventBus();

// ② 挂载
// 1.使用provide提供
app.provide("$bus", $bus);
// 2.挂载到this上
app.config.globalProperties.$bus = $bus;
```

created 中使用不需要引入 inject

```ts
// Button.vue
export default {
  created() {
    this.$bus.emit("ButtonCreated");
  },
};
```

setup 无法访问到 this 所以需要 provide/inject

```ts
import { inject } from "vue";
export default {
  setup() {
    const $bus = inject("$bus");
    $bus.emit("ButtonSetup");
  },
};
```

参考文献: https://juejin.cn/post/6890781300648017934
