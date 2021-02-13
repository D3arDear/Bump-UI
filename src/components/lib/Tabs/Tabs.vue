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
      <component
        v-for="(currentItem, index) in defaults"
        :is="currentItem"
        :key="index"
        :class="
          classes('content', 'item', selectedClass(currentItem.props.title))
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
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
      });
    });

    const defaults = context.slots.default();
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 的子标签必须是 Tab");
      }
    });
    const classes = classMaker("BUI-Tabs");

    const disabledList = defaults.map((el) =>
      el.props.disabled !== undefined ? true : false
    );
    console.log(disabledList);
    const titles = defaults.map((element) => element.props.title);

    const selectedClass = (t) => (t === props.selected ? "selected" : "");

    const select = (title: string) => {
      console.log(title);
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
    };
  },
};
</script>

<style lang="scss">
@import "./Tabs.scss";
</style>