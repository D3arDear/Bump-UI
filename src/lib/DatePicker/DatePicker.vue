<template>
  <div ref="popoverContainer" class="BUI-DatePicker">
    <Popover
      ref="BUIPopover"
      position="bottom"
      :container="popoverContainer"
      @open="onOpen"
    >
      <Input
        type="text"
        v-model:value="inputValue"
        :focused="inputValue.length > 0"
        @input="onInput"
        @change="onChange"
        ref="datePickerInput"
      ></Input>
      <template v-slot:content>
        <div :class="classes('pop', '', '')" @selectstart.prevent>
          <div :class="classes('nav', '', '')">
            <span :class="classes('nav', 'prevYear-icon', '')" @click="onClickPrevYear"
              ><Icon name="doubleLeft"></Icon
            ></span>
            <span :class="classes('nav', 'prevMonth-icon', '')" @click="onClickPrevMonth"
              ><Icon name="left"></Icon
            ></span>
            <span :class="classes('nav', 'yearAndMonth', '')" @click="onClickMonth">
              <span>{{ display.year }}年</span>
              <span>{{ display.month + 1 }}月</span>
            </span>
            <span :class="classes('nav', 'nextMonth-icon', '')" @click="onClickNextMonth"
              ><Icon name="right"></Icon
            ></span>
            <span :class="classes('nav', 'nextYear-icon', '')" @click="onClickNextYear"
              ><Icon name="doubleRight"></Icon
            ></span>
          </div>
          <div :class="classes('panel', '', '')">
            <div :class="classes('panel', 'content', '')">
              <transition name="BUI-animation--fade" mode="out-in">
                <div v-if="mode === 'month'">
                  <div :class="classes('panel', 'content-selectMonth', '')">
                    <div :class="classes('panel', 'content-selects', '')">
                      <Selector
                        :sourceData="years"
                        @update:value="onSelectYear"
                        :value="display.year"
                        width="6em"
                      ></Selector>
                      <span>年</span>
                      <Selector
                        :sourceData="
                          [...new Array(13).keys()].filter((item) => item !== 0)
                        "
                        @update:value="onSelectMonth"
                        width="4em"
                        :value="display.month + 1"
                      ></Selector>
                      <span>月</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div :class="classes('panel', 'content-week', '')">
                    <span
                      :class="
                        classes(
                          'panel',
                          'content-weekday',
                          `${i === 6 || i === 0 ? 'active' : ''}`
                        )
                      "
                      v-for="i in [1, 2, 3, 4, 5, 6, 0]"
                      :key="i"
                    >
                      {{ weekdays[i] }}
                    </span>
                  </div>
                  <div
                    :class="classes('panel', 'content-row', '')"
                    v-for="i in helper.range(1, 7)"
                    :key="i"
                  >
                    <span
                      :class="[
                        classes('panel', 'content-cell', ''),
                        {
                          currentMonth: isCurrentMonth(getVisibleDay(i, j)),
                          selected: isSelected(getVisibleDay(i, j)),
                          today: isToday(getVisibleDay(i, j)),
                        },
                      ]"
                      v-for="j in helper.range(1, 8)"
                      @click="onClickCell(getVisibleDay(i, j))"
                      :key="j"
                    >
                      {{ getVisibleDay(i, j).getDate() }}
                    </span>
                  </div>
                  <div :class="classes('actions', '', '')">
                    <Button @click="onClickToday" textButton>今天</Button>
                    <Button @click="onClickClear" textButton>清除</Button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
import Input from "../Input/Input.vue";
import Icon from "../Icon.vue";
import Popover from "../Popover/Popover.vue";
import helper from "./DatePickerHelper";
import Scroll from "../Scroll/Scroll.vue";
import Button from "../Button/Button.vue";
import {
  computed,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { classMaker } from "../common/classMaker";
import Selector from "../Selector/Selector.vue";

export default {
  components: { Input, Icon, Popover, Scroll, Button, Selector },
  directives: {
    clickOutside: {
      beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  name: "BUI-DateRangePicker",
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 1,
    },
    value: {
      type: Date as PropType<Date>,
    },
    scope: {
      type: Array as PropType<Date[]>,
      default: () => [new Date(1900, 0, 1), helper.addYear(new Date(), 100)],
    },
  },
  setup(props, context) {
    let [year, month] = helper.getYearMonthDate(props.value || new Date());
    const mode = ref<string>("day");
    const popoverContainer = ref<HTMLDivElement>(null);
    const BUIPopover = ref(null);
    const input = ref(null);
    const weekdays = ref<string[]>(["日", "一", "二", "三", "四", "五", "六"]);
    const display = reactive({ year, month });
    const classes = classMaker("BUI-DatePicker");
    const inputValue = ref<string>("");

    const onClickDayMode = () => {
      mode.value = "day";
    };

    const onInput = () => {
      const value = validateValue(inputValue.value);
      if (value) {
        context.emit("update:value", value);
        updateInputValue();
      }
    };
    const onChange = () => {
      updateInputValue();
    };

    const validateValue = (value) => {
      let regex = /^\d{4}-\d{2}-\d{2}$/g;
      if (value.match(regex)) {
        let [year1, month1, day1] = value.split("-");
        year = year - 0;
        display.year = year1;
        display.month = month1;
        return new Date(year, month, day1);
      }
      return null;
    };

    const onClickMonth = () => {
      if (mode.value !== "month") {
        mode.value = "month";
      } else {
        mode.value = "day";
      }
    };

    const isCurrentMonth = (date) => {
      let [year1, month1] = helper.getYearMonthDate(date);
      return year1 === display.year && month1 === display.month;
    };

    const getVisibleDay = (row, col) => {
      return visibleDays.value[(row - 1) * 7 + col - 1];
    };

    const onClickCell = (date) => {
      if (isCurrentMonth(date)) {
        context.emit("update:value", date);
        updateInputValue();
        BUIPopover.value.close();
      }
    };

    const onClickPrevYear = () => {
      const oldDate = new Date(display.year, display.month);
      const newDate = helper.addYear(oldDate, -1);
      const [year, month] = helper.getYearMonthDate(newDate);
      display.year = year;
      display.month = month;
    };

    const onClickNextYear = () => {
      const oldDate = new Date(display.year, display.month);
      const newDate = helper.addYear(oldDate, 1);
      const [year, month] = helper.getYearMonthDate(newDate);
      display.year = year;
      display.month = month;
    };

    const onClickPrevMonth = () => {
      const oldDate = new Date(display.year, display.month);
      const newDate = helper.addMonth(oldDate, -1);
      const [year, month] = helper.getYearMonthDate(newDate);
      display.year = year;
      display.month = month;
    };
    const onClickNextMonth = () => {
      const oldDate = new Date(display.year, display.month);
      const newDate = helper.addMonth(oldDate, 1);
      const [year, month] = helper.getYearMonthDate(newDate);
      display.year = year;
      display.month = month;
    };

    const onClickToday = () => {
      const now = new Date();
      const [year, month, day] = helper.getYearMonthDate(now);
      display.year = year;
      display.month = month;
      context.emit("update:value", new Date(year, month, day));
      updateInputValue();
    };
    const onClickClear = () => {
      context.emit("update:value", null);
      updateInputValue();
      BUIPopover.value.close();
    };

    const onSelectYear = (e) => {
      const year = e - 0;
      const d = new Date(year, display.month);
      if (d >= props.scope[0] && d <= props.scope[1]) {
        display.year = year;
      } else {
        e = display.year;
      }
    };

    const onSelectMonth = (e) => {
      const month = e - 1;
      const d = new Date(display.year, month);
      if (d >= props.scope[0] && d <= props.scope[1]) {
        display.month = month;
      } else {
        e = display.month;
      }
    };

    const onOpen = () => {
      mode.value = "day";
    };

    const isSelected = (date) => {
      if (!props.value) {
        return false;
      }
      let [y, m, d] = helper.getYearMonthDate(date);
      let [y2, m2, d2] = helper.getYearMonthDate(props.value);
      return y === y2 && m === m2 && d === d2;
    };

    const isToday = (date) => {
      let [y, m, d] = helper.getYearMonthDate(date);
      let [y2, m2, d2] = helper.getYearMonthDate(new Date());
      return y === y2 && m === m2 && d === d2;
    };

    const updateInputValue = async () => {
      await nextTick(() => {
        inputValue.value = formattedValue.value;
      });
    };

    onMounted(() => {
      updateInputValue();
    });

    const formattedValue = computed(() => {
      if (!props.value) {
        return "";
      }
      const [year, month, day] = helper.getYearMonthDate(props.value);
      return `${year}-${helper.pad2(month + 1)}-${helper.pad2(day)}`;
    });

    const years = computed(() => {
      return helper.range(props.scope[0].getFullYear(), props.scope[1].getFullYear() + 1);
    });

    const visibleDays = computed(() => {
      let date = new Date(display.year, display.month, 1);
      let first = helper.firstDayOfMonth(date);
      let last = helper.lastDayOfMonth(date);
      let [year, month, day] = helper.getYearMonthDate(date);
      let n = first.getDay();
      let array = [];
      let x = first.getTime() - (n === 0 ? 6 : n - 1) * 3600 * 24 * 1000;
      for (let i = 0; i < 42; i++) {
        array.push(new Date(x + i * 3600 * 24 * 1000));
      }
      return array;
    });

    return {
      popoverContainer,
      input,
      BUIPopover,
      mode,
      helper,
      weekdays,
      display,
      years,
      inputValue,
      formattedValue,
      onClickDayMode,
      classes,
      onInput,
      onChange,
      onOpen,
      onClickMonth,
      onClickClear,
      onClickToday,
      onClickCell,
      onClickPrevYear,
      onClickPrevMonth,
      onClickNextYear,
      onClickNextMonth,
      onSelectYear,
      onSelectMonth,
      getVisibleDay,
      isCurrentMonth,
      isSelected,
      isToday,
    };
  },
};
</script>
