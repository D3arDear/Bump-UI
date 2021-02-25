<template>
  <div class="DatePicker">
    <h1>DatePicker 组件</h1>
    <Demo :component="DatePickerDemo1" defaultVisible>
      <p>DatePicker 基本用法</p>
    </Demo>
    <AttrTable title="DatePicker Attributes" :sourceData="datepickerAttr" />
  </div>
</template>

<script lang="ts" scoped>
import AttrTable from '../AttrTable.vue';
import Demo from "../Demo.vue";
import DatePickerDemo1 from './DatePicker.demo1.vue'
import DatePickerDemo2 from './DatePicker.demo2.vue'
export default {
  name: "SwitchDemo",
  components: { Demo, AttrTable },
  setup() {

    const datepickerAttr = [
      {
        id: 0,
        attr: 'value',
        content: "DatePicker 的绑定日期值",
        type: 'Date',
        option: '',
        default: '',
        required: 'true',
        description: ''
      },
      {
        id: 1,
        attr: 'scope',
        content: "限定的可选日期范围",
        type: 'Date[]',
        option: '',
        default: '',
        required: 'true',
        description: ''
      }
    ]
    return {
      DatePickerDemo1,
      DatePickerDemo2,
      datepickerAttr
    };
  },
}
</script>

<style lang="scss">
.DatePicker {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
