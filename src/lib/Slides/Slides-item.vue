<template>
  <div class="BUI-Slides-item">
    <transition name="BUI-Slides-animation" mode="out-in">
      <div class="BUI-Slides-item__content" v-if="visible" :class="{ reverse }">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script lang='ts'>
import { computed, inject, onMounted, onUpdated, ref } from 'vue';
import { EventBusType } from '../common/eventBus';
export default {
  name: "BUI-Slides-item",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const eventBus = inject<EventBusType>("EventBus");
    const selected = ref(undefined)
    const reverse = ref(false)

    const visible = computed(() => {
      return selected.value === props.name
    })
    onMounted(() => {
      eventBus.on(`update:reverse-${props.name}`, (payload) => {
        reverse.value = payload
      })
      eventBus.on(`update:selected-${props.name}`, (payload) => {
        selected.value = payload
      })
    })

    return {
      selected,
      reverse,
      visible,
      props,
    }
  },
};
</script>
