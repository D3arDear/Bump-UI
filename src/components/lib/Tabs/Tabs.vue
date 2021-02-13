<template>
  <div :class="classes('', '', '')">
    <div :class="classes('nav', '', '')">
      <div
        v-for="(t, index) in titles"
        @click="select(t)"
        :key="t"
        :class="classes('nav', 'item', t === selected ? 'selected' : '')"
      >
        {{ t }}
      </div>
    </div>
    <div :class="classes('content', '', '')">
      <component
        v-for="(c, index) in defaults"
        :is="c"
        :key="index"
        :class="
          classes(
            'content',
            'item',
            c.props.title === selected ? 'selected' : ''
          )
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
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
    const ifItemActive = computed((title: string) => {
      return title === selected ? "selected" : "";
    });
    const select = (title: string) => {
      context.emit("update:selected", title);
    };

    return { classes, defaults, titles, ifItemActive, select };
  },
};
</script>

<style lang="scss">
@import "./Tabs.scss";
</style>