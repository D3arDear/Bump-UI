<template>
  <div
    class="BUI-pager"
    :class="{ hide: hideIfOnePage === true && totalPage <= 1 }"
  >
    <span
      class="BUI-pager-nav prev"
      :class="{ disabled: currentPage === 1 }"
      @click="onClickPage(currentPage - 1)"
    >
      <Icon name="left"></Icon>
    </span>
    <template v-for="page in pages">
      <template v-if="page === currentPage">
        <span class="BUI-pager-item current">
          {{ page }}
        </span>
      </template>
      <template v-else-if="page === '...'">
        <Icon class="BUI-pager-separator" name="dots"></Icon>
      </template>
      <template v-else>
        <span class="BUI-pager-item other" @click="onClickPage(page)">{{
          page
        }}</span>
      </template>
    </template>
    <span
      class="BUI-pager-nav next"
      :class="{ disabled: currentPage === totalPage }"
      @click="onClickPage(currentPage + 1)"
    >
      <Icon name="right"></Icon>
    </span>
  </div>
</template>


<script lang="ts">
import { computed } from 'vue';
const unique = (array) => {
  //  return [...new Set(array)];
  const object = {};
  array.map(number => {
    object[number] = true;
  });
  return Object.keys(object).map(s => parseInt(s, 10));
}
import Icon from "../Icon.vue";

export default {
  name: "BUI-Pager",
  components: { Icon },
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const pages = computed(() => {
      return unique(
        [
          1,
          props.totalPage,
          props.currentPage,
          props.currentPage - 1,
          props.currentPage - 2,
          props.currentPage + 1,
          props.currentPage + 2
        ]
          .filter(n => n >= 1 && n <= props.totalPage)
          .sort((a, b) => a - b)
      ).reduce((prev, current, index, array) => {
        prev.push(current); // 1
        array[index + 1] !== undefined &&
          array[index + 1] - array[index] > 1 &&
          prev.push("...");
        return prev;
      }, []);
    })

    const onClickPage = (n) => {
      if (n >= 1 && n <= props.totalPage) {
        context.emit("update:currentPage", n);
      }
    }
    return {
      pages,
      onClickPage
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../style/theme.scss";
$--color--default-pager-color: #009688;
.BUI-pager {
  $width: 20px;
  $height: 20px;
  $font-size: 12px;
  font-style: normal;
  display: flex;
  user-select: none;
  justify-content: flex-start;
  align-items: center;
  &.hide {
    display: none;
  }
  &-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: $height;
    width: $width;
    font-size: $font-size;
    margin: 0 4px;
    cursor: pointer;
    svg {
      fill: $--color--pager;
    }
    &.disabled {
      cursor: default;
      svg {
        fill: $--color--disabled;
      }
    }
  }
  &-separator {
    width: $width;
    font-size: $font-size;
    fill: $--color--pager;
  }
  &-item {
    color: $--color--pager;
    border-radius: 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: $width;
    height: $height;
    padding: 4px;
    margin: 0 4px;
    font-size: $font-size;
    cursor: pointer;
    &.separator {
      &:hover {
        user-select: none;
        cursor: auto;
      }
    }
    &.current {
      color: $--color--pager;
      background: linear-gradient(
        0deg,
        rgba(153, 153, 153, 0.2),
        rgba(153, 153, 153, 0.2)
      );
      font-weight: bold;
    }
    &:hover {
      background: linear-gradient(
        0deg,
        rgba(153, 153, 153, 0.1),
        rgba(153, 153, 153, 0.1)
      );
    }
    &.current:hover {
      background: linear-gradient(
        0deg,
        rgba(153, 153, 153, 0.2),
        rgba(153, 153, 153, 0.2)
      );
      user-select: none;
      cursor: auto;
    }
  }
}
</style>