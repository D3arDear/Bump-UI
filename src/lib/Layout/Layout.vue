<template>
  <div :class="[layoutClass, classes('', '', '')]">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { onMounted, reactive } from 'vue';
import { classMaker } from '../common/classMaker';
export default {
  name: "BUI-Layout",
  setup(props, context) {
    const classes = classMaker('BUI-Layout')
    const layoutClass = reactive({
      hasSider: false
    })
    onMounted(() => {
      context.slots.default().forEach(vm => {
        // @ts-ignore
        if (vm.type.name === "BUI-Aside") {
          layoutClass.hasSider = true;
        }
      });
    })
    return {
      layoutClass,
      classes
    }
  }
}
</script>

<style lang="scss">
.BUI-Layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &.hasSider {
    flex-direction: row;
  }
}

.sider.slide-enter,
.sider.slide-leave-to {
  margin-left: -200px;
}
.header {
  height: 50px;
}
.footer {
  height: 100px;
}
</style>
