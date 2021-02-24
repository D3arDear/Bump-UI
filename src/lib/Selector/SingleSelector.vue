<template>
  <div :class="classes('', '', '')" :style="{ width: width }" ref="wrapper">
    <Input
      type="text"
      v-on="{
        click: openList,
      }"
      :value="value"
      :class="classes('input', '', '')"
      ref="selectorInput"
      standard
    />
    <div :class="classes('list-wrapper', '', '')" v-if="listVisible">
      <ul :class="classes('list', '', '')">
        <Scroll :style="{ width: width, height: '9em' }">
          <li
            v-for="(item, index) in sourceData"
            :key="index"
            v-on:click="onClickItem(item)"
            raf="itemWrapper"
            :class="classes('list', 'item', '')"
          >
            {{ item }}
          </li>
        </Scroll>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { classMaker } from '../common/classMaker'
import Input from '../Input/Input.vue'
import Scroll from '../Scroll/Scroll.vue'
export default {
  components: { Input, Scroll },
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
    }
  },
  props: {
    sourceData: {
      type: Array,
      require: true
    },
    width: {
      type: String,
      require: true
    },
    value: {
      type: String
    }
  },
  setup(props, context) {
    const { ...rest } = context.attrs
    const listVisible = ref(false)
    const itemWrapper = ref<HTMLDivElement>(null)
    const selectorInput = ref<HTMLInputElement>(null)
    const wrapper = ref<HTMLInputElement>(null)
    const classes = classMaker('BUI-Selector')
    const scrollHeight = ref(0)

    const openList = async () => {
      listVisible.value = true
      await nextTick(() => {
        document.addEventListener('click', onClickDocument)
      })
    }
    const closeList = async () => {
      listVisible.value = false
      await nextTick(() => {
        document.removeEventListener('click', onClickDocument)

      })
    }



    const onClickItem = async (item) => {
      context.emit('update:value', item)
      await nextTick(() => {
        closeList()
      })
    }

    const onClickDocument = (e) => {
      if ((wrapper.value &&
        wrapper.value === e.target) || (wrapper.value && wrapper.value.contains(e.target))
      ) { return }
      if (itemWrapper.value &&
        (itemWrapper.value === e.target || itemWrapper.value.contains(e.target))
      ) { return }
      closeList()
    }

    onMounted(() => {
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', onClickDocument)
    })
    return {
      rest, classes, itemWrapper, wrapper, selectorInput, scrollHeight,
      openList, closeList, onClickItem,
      listVisible
    }
  }
}
</script>
<style lang="scss" >
@import "../style/theme.scss";
.BUI-Selector {
  font-size: $--font--size--default;
  position: relative;
  order: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  &-input {
    top: 3em;
    left: 0;
    height: 3em;
    width: 100%;
    font-size: inherit;
  }
  &-list-wrapper {
    overflow: hidden;
    position: absolute;
    height: 9em;
    background: $--color--background;
    border-radius: $--border-radius--default;
    font-size: inherit;
    border: 1px solid lighten($--color--background, 10%);
    box-shadow: shadowD-oneWay(
          top,
          darken($--color--background, 2%),
          ($--blur-range-0 + 8px)
        )
        inset,
      shadowD-oneWay(
          bottom,
          darken($--color--background, 5%),
          ($--blur-range-0 + 4px)
        )
        inset;
  }
  &-list {
    top: 0;
    left: 0;
    width: 100%;
    font-size: inherit;
    border-radius: $--border-radius--default;
    &__item {
      font-size: inherit;
      color: ContrastText($--color--background);
      padding: calc(1em - 1px);
      line-height: 1;
      border-bottom: 1px solid rgba(ContrastText($--color--background), 0.1);
      border-top: 1px solid rgba(ContrastText($--color--background), 0.1);
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        color: ContrastText(rgba($--color--primary, 0.5));
        background: rgba($--color--primary, 0.5);
        box-shadow: surface-shadow-generator(
          $light-direction,
          $--color--primary,
          $--blur-range-0
        );
      }
    }
  }
}
</style>