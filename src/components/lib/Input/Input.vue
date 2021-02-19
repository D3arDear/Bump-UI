<template>
  <div class="wrapper" :class="{ error }">
    <input
      ref="input"
      :value="value"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
      @change="updateValue"
      @input="updateValue"
      @focus="updateValue"
      @blur="updateValue"
    />
    <template v-if="error">
      <icon name="error" class="icon-error"></icon>
      <span class="errorMsg">{{ error }}</span>
    </template>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import Icon from "../Icon.vue";
export default {
  components: { Icon },
  name: "BUI-Input",
  props: {
    value: {
      type: [String, Date]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  },
  setup(props, context) {
    const input = ref<HTMLInputElement>(null)

    const setRawValue = (value) => {
      input.value = value;
    }
    const updateValue = ($event) => {
      context.emit('update:value', $event.target.value)
    }
    return {
      setRawValue,
      context,
      updateValue
    }
  }
}
</script>

<style lang="scss" scoped>
/* --button-height: 32px;
--font-size: 16px;
--button-bg: white;
--button-active-bg: #eee;
--border-radius: 2px;
--color: #333;
--border-color: #999;
--border-color-hover: #666; */
@import "../style/theme.scss";
$font-size: $--font--size--default;
$box-shadow-color: $--color--background;
$border-color-hover: darken($--color--background, 10%);
.wrapper {
  font-size: $font-size;
  display: inline-block;
  align-items: center;
  vertical-align: middle;
  &.error {
    > input {
      border-color: #ff000080;
    }
  }
  .icon-error {
    fill: #ff000080;
  }
  .errorMsg {
    color: #ff000080;
    font-size: $font-size;
  }
  > input {
    height: 32px;
    border-radius: 2px;
    padding: 0 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    background: #fafafa;
    font-size: $font-size;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    &[disabled],
    &[readonly] {
      border-color: rgba(0, 0, 0, 0.3);
      color: rgba(0, 0, 0, 0.5);
      cursor: not-allowed;
    }
  }
}
</style>
