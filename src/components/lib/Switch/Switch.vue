<template>
  <SwitchNormal
    v-if="!retro"
    :flat="flat"
    :value="value"
    v-model:value="value"
    :toggle="toggle"
  />
  <SwitchRetro v-if="retro" :value="value" v-model:value="value" :toggle="toggle" />
</template>

<script lang="ts">
import { ref } from "vue";
import SwitchNormal from "./Switch.normal.vue";
import SwitchRetro from "./Switch.retro.vue";
export default {
  name: "Switch",
  components: { SwitchNormal, SwitchRetro },
  props: {
    value: Boolean,
    flat: {
      type: Boolean,
      default: false,
    },
    retro: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const toggle = () => {
      console.log("点击了");
      context.emit("update:value", !props.value);
    };
    return { toggle };
  },
};
</script>

<style lang="scss" scoped>
$h: 22px;
$h2: $h - 4px;
$small-shadow: 2px 2px 6px
    rgba(
      $color: #000,
      $alpha: 0.3,
    ),
  -2px -2px 6px
    rgba(
      $color: #fff,
      $alpha: 0.7,
    );

$small-shadow-inset: 2px 2px 5px inset
    rgba(
      $color: #000,
      $alpha: 0.3,
    ),
  -2px -2px 5px inset
    rgba(
      $color: #fff,
      $alpha: 0.5,
    );

$tiny-shadow: -2px -2px 4px rgba(
      $color: #ffffff,
      $alpha: 0.6,
    ),
  2px 2px 4px
    rgba(
      $color: #000000,
      $alpha: 0.4,
    );

button {
  height: $h;
  width: $h * 2;
  border: none;
  background: linear-gradient(145deg, #dfdfdf, #ffffff);
  border-radius: $h/2;
  position: relative;
  box-shadow: $small-shadow, $small-shadow-inset;
  transition: background 250ms;
  &.checked {
    background: linear-gradient(145deg, #e06a2a, #ff7e32);
    > span {
      left: calc(100% - #{$h2} - 2px);
    }
  }
  &.flat {
    box-shadow: $small-shadow-inset;
  }
  &:focus {
    outline: none;
  }
  > span {
    position: absolute;
    top: 2px;
    left: 2px;
    height: $h2;
    width: $h2;
    background: linear-gradient(145deg, #ffffff, #dfdfdf);
    border-radius: $h2/2;
    box-shadow: $tiny-shadow;
    transition: left 250ms;
  }
}
</style>
