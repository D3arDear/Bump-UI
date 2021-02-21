<template>
  <div :class="classes('', '', '')">
    <div :class="classes('nav', '', '')" ref="container">
      <div
        v-for="(t, index) in titles"
        @click="!disabledList[index] && select(t)"
        :key="index"
        :class="[
          classes('nav', 'item', selectedClass(t)),
          { disabled: disabledList[index] },
        ]"
        :ref="
          (el) => {
            if (t === selected) selectedItem = el;
          }
        "
      >
        {{ t }}
      </div>
      <div :class="classes('nav', 'item-indicator', '')" ref="indicator"></div>
    </div>
    <div :class="classes('content', '', '')">
      <transition :name="classes('animation', '', 'slide-fade')" mode="out-in">
        <component
          :is="current"
          :key="current.props.title"
          :class="
            classes('content', 'item', selectedClass(current.props.title))
          "
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, VNode, watchEffect } from "vue";
import { classMaker } from "../common/classMaker";
import Tab from "./Tab.vue";
export default {
  name: "BUI-Tabs",
  props: {
    selected: {
      type: String,
    },
  },
  setup(props, context) {
    const classes = classMaker("BUI-Tabs");
    const selectedClass = (t) => (t === props.selected ? "selected" : "");
    const selectedItem = ref<HTMLDivElement>(null);
    const indicator = ref<HTMLDivElement>(null);
    const container = ref<HTMLDivElement>(null);
    onMounted(() => {
      watchEffect(() => {
        const { width } = selectedItem.value.getBoundingClientRect();
        indicator.value.style.width = width + "px";
        const { left: left1 } = container.value.getBoundingClientRect();
        const { left: left2 } = selectedItem.value.getBoundingClientRect();
        const left = left2 - left1;
        indicator.value.style.left = left + "px";
      }, { flush: 'post' });
    });
    const defaults = context.slots.default();
    defaults.forEach((tag) => {
      // @ts-ignore
      if (tag.type.name !== Tab.name) {
        throw new Error("Tabs 的子标签必须是 Tab");
      }
    });
    const disabledList = defaults.map((el) =>
      el.props.disabled !== undefined ? true : false
    );
    const current = computed(() => {
      return defaults.find((tag) => { return tag.props.title === props.selected });
    });
    const titles = defaults.map((element) => element.props.title);
    const select = (title: string) => {
      context.emit("update:selected", title);
    };
    return {
      classes,
      defaults,
      titles,
      disabledList,
      select,
      selectedItem,
      indicator,
      container,
      selectedClass,
      current,
      Tab
    };
  },
};
</script>

<style lang="scss">
@import "./Tabs.scss";
.BUI-Tabs-animation--slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease;
    transform: translateY(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-5%);
  }
}
</style>