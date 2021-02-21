<template>
  <div
    :class="
      classes(
        '',
        'container',
        `${errorPosition === 'right' ? 'error-right' : ''}`
      )
    "
  >
    <div
      :class="[
        classes('', 'wrapper', `${standard ? 'standard' : ''}`),
        label ? '' : 'noLabel',
      ]"
    >
      <div
        v-if="label"
        :class="classes('', 'label', `${value ? 'active' : ''}`)"
      >
        <span>{{ label }}</span>
      </div>
      <input
        :class="classes('', '', '')"
        ref="input"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="rest"
        v-on="{
          change: onChange,
          input: onInput,
          focus: onFocus,
          blur: onBlur,
        }"
      />
    </div>
    <template v-if="error">
      <div :class="classes('', 'error', '')">
        <Icon name="error" :class="classes('', 'error-icon', '')"></Icon>
        <span :class="classes('', 'error-msg', '')">{{ error }}</span>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import Icon from "../Icon.vue";
import { classMaker } from '../common/classMaker';
export default {
  inheritAttrs: false,
  components: { Icon },
  name: "BUI-Input",
  props: {
    value: {
      type: [String, Date]
    },
    label: {
      type: String,
    },
    standard: {
      type: Boolean
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
    },
    errorPosition: {
      type: String,
      default: 'bottom',
      validator: (value: string) => {
        return ['bottom', 'right'].indexOf(value) >= 0
      }
    }
  },
  setup(props, context) {
    const { ...rest } = context.attrs
    const input = ref<HTMLInputElement>(null)
    const focus = ref(false)
    const classes = classMaker('BUI-Input')

    const setRawValue = (value) => {
      input.value = value;
    }
    const updateValue = (value) => {
      context.emit('update:value', value)
    }
    const onInput = ($event) => {
      console.log('onInput')
      updateValue($event.target.value)
    }
    const onFocus = () => {
      focus.value = true
    }
    const onBlur = () => {
      focus.value = false
    }
    const onChange = () => {
      console.log('onChange')
    }
    return {
      classes,
      setRawValue,
      context,
      updateValue,
      onFocus, onBlur, onChange, onInput,
      rest,
    }
  }
}
</script>

<style lang="scss">
@import "./input.scss";
</style>
