
<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>
<script lang='ts' setup context>
import { onMounted } from "vue";

const name = "zealotLayout"
const layoutClass = {
  hasSider: false
}
onMounted(() => {

  context.children.forEach(vm => {
    if (vm.$options.name === "zealotSider") {
      this.layoutClass.hasSider = true;
    }
  })
})
</script>

<style lang="scss" scoped>
.layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &.hasSider {
    flex-direction: row;
  }
}
</style>
