<template>
  <div :class="classes('', '', '')">
    <div :class="classes('nav', '', '')">
      <div
        :class="classes('nav', 'item', ifItemActive(t))"
        v-for="(t, index) in titles"
        :key="t"
      >
        {{ t }}
      </div>
    </div>
    <div :class="classes('content', '', '')">
      <component
        :class="classes('content', 'item', ifItemActive(c.props.title))"
        v-for="(c, index) in defaults"
        :is="c"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
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
    const { selected } = props;
    const defaults = context.slots.default();
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 的子标签必须是 Tab");
      }
    });
    const classes = classMaker("BUI-Tabs");

    const titles = defaults.map((element) => element.props.title);
    const ifItemActive = (title) => (title === selected ? "selected" : "");

    return { classes, defaults, titles, ifItemActive };
  },
};
</script>

<style lang="scss">
@import "./Tabs.scss";
</style>