<template>
  <div class="BUI-Nav" :class="{ vertical: vertical }">
    <slot></slot>
  </div>
</template>


<script lang='ts'>
import { onMounted, onUpdated, provide, reactive, ref } from 'vue';
import EventBus from '../common/eventBus'
export default {
  name: "BUI-Nav",
  props: {
    selected: {
      type: String
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const eventBus = reactive(new EventBus())
    const items = ref([])
    const namePath = ref([])
    provide("EventBus", eventBus);
    provide("root", context);
    provide("vertical", props.vertical);
    provide("namePath", namePath.value);

    eventBus.on('addItem', (payload) => {
      addItem(payload)
    })
    eventBus.on('resetNamePath', (payload) => {
      items.value = []
    })
    eventBus.on('update:namePath', (payload) => {
      namePath.value = payload
    })

    const listenToChildren = () => {
      items.value.forEach(vm => {
        eventBus.on("update:selected", name => {
          context.emit("update:selected", name);
        });
      });
    }
    const updateChildren = () => {
      items.value.forEach(vm => {
        if (props.selected === vm.props.name) {
          vm.props.selected = true;
        } else {
          vm.props.selected = false;
        }
      });
    }
    const addItem = (vm) => {
      items.value.push(vm);
    }

    onMounted(() => {
      updateChildren();
      listenToChildren();
    })
    onUpdated(() => {
      updateChildren();
    })

    return {
      items,
      namePath,
      addItem
    };
  },
};
</script>

<style lang="scss">
@import "../style/theme.scss";
.BUI-Nav {
  color: ContrastText($--color--background);
  display: flex;
  border-radius: $--border-radius--default;
  box-shadow: shadow-generator(
    $light-direction,
    $--color--background,
    $--border-radius--default,
    false
  );
  background: $--color--background;
  cursor: pointer;
  user-select: none;
  &.vertical {
    flex-direction: column;
  }
}
</style>
