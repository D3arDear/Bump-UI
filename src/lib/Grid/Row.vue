<template>
  <div class="BUI-Row" :class="rowClass" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, provide } from 'vue';
export default {
  name: "BUI-Row",
  props: {
    gutter: {
      type: [Number, String]
    },
    align: {
      type: String,
      validator: (value: string) => {
        return ["left", "right", "center"].indexOf(value) >= 0;
      }
    }
  },
  setup(props, context) {
    provide<number | string>('gutter', props.gutter)
    const rowStyle = computed(() => {
      return {
        marginLeft: -props.gutter / 2 + "px",
        marginRight: -props.gutter / 2 + "px"
      };
    })

    const rowClass = computed(() => {
      let { align } = props
      return [align && `align-${align}`]
    })
    onMounted(() => {
      context.slots.default().forEach(vm => {
        vm.props.gutter = props.gutter;
      });
    })
    return {
      rowClass,
      rowStyle
    }
  }
};
</script>

<style lang="scss">
.BUI-Row {
  display: flex;
  flex-wrap: wrap;
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  &.align-center {
    justify-content: center;
  }
}
</style>
