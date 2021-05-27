<template>
  <div :class="classes('Item', '', '')">
    <div
      :class="classes('Item', 'title', `${open ? 'open' : ''}`)"
      @click="toggle"
    >
      <span>{{ title }}</span>
      <Icon :class="classes('Item', 'title-icon')" name="right" />
    </div>
    <Fold :visible="open" :duration="300">
      <div :class="classes('Item', 'content', '')">
        <slot></slot>
      </div>
    </Fold>
  </div>
</template>
<script lang="ts">
import { inject, onMounted, ref } from "vue";
import { EventBusType } from "../common/eventBus";
import { classMaker } from "../common/classMaker";
import Icon from "../Icon.vue";
import Fold from "../Animation/Fold.vue";

export default {
  name: "BUI-Collapse-item",
  components: {
    Icon,
    Fold,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const eventBus = inject<EventBusType>("EventBus");
    const { name } = props;
    const open = ref(false);
    const classes = classMaker("BUI-Collapse");

    onMounted(() => {
      eventBus.on("update:selected", (names) => {
        if (names.indexOf(name) >= 0) {
          open.value = true;
        } else {
          open.value = false;
        }
      });
    });
    const toggle = () => {
      if (open.value) {
        eventBus.emit("item:close", { methods: "close", name: name });
      } else {
        eventBus.emit("item:open", { methods: "open", name: name });
      }
    };

    return {
      open,
      toggle,
      classes,
    };
  },
};
</script>
