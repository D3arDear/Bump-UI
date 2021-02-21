<template>
  <button
    :class="[classes('', '', `${size ? size : ''}`), { rounded: rounded }]"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { classMaker } from '../common/classMaker'

export default {
  props: {
    rounded: {
      type: Boolean
    },
    size: {
      type: String
    }
  },
  setup() {
    const classes = classMaker('BUI-PagerCurrentButton')
    return {
      classes
    }
  }
}
</script>

<style lang="scss">
@import "../style/theme.scss";
.BUI-PagerCurrentButton {
  padding: 0 1em;
  height: 3em;
  border-radius: 8px;
  font-size: $--font--size--default;
  border: none;
  display: inline-flex;
  justify-content: center;
  align-self: center;
  outline: 0px;
  @include surface($light-direction, $--color--pager, convex);
  @include shadow($light-direction, $--color--pager, $--blur-range-2, false);
  &.rounded {
    border-radius: 1.5em;
    min-width: 3em;
  }
  &--big {
    @extend .BUI-PagerCurrentButton;
    font-size: $--font--size--big;
    height: 3em;
    padding: 0 1.5em;
    &.rounded {
      height: 3em;
      min-width: 3em;
      border-radius: 1.5em;
    }
  }
  &--medium {
    @extend .BUI-PagerCurrentButton;
    font-size: $--font--size--medium;
    height: 2.75em;
    padding: 0 1em;
    &.rounded {
      height: 2.75em;
      min-width: 2.75em;
      border-radius: 1.375em;
    }
  }
  &--small {
    @extend .BUI-PagerCurrentButton;
    font-size: $--font--size--small;
    height: 2.5em;
    padding: 0 0.75em;
    &.rounded {
      height: 2.5em;
      min-width: 2.5em;
      border-radius: 1.25em;
    }
  }
  &--mini {
    @extend .BUI-PagerCurrentButton;
    font-size: $--font--size--small;
    height: 2.25em;
    padding: 0 0.75em;
    &.rounded {
      height: 2.25em;
      min-width: 2.25em;
      border-radius: 1.125em;
    }
  }
}
</style>