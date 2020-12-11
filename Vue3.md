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
