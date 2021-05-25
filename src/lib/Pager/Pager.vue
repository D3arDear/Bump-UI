<template>
  <div class="BUI-pager" :class="{ hide: hideIfOnePage === true && totalPage <= 1 }">
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
        <span class="BUI-pager-item other" @click="onClickPage(page)">{{ page }}</span>
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
import { computed } from "vue";
const unique = (array) => {
  //  return [...new Set(array)];
  const object = {};
  array.map((number) => {
    object[number] = true;
  });
  return Object.keys(object).map((s) => parseInt(s, 10));
};
import Icon from "../Icon.vue";

export default {
  name: "BUI-Pager",
  components: { Icon },
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    hideIfOnePage: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const pages = computed(() => {
      return unique(
        props.currentPage <= 4
          ? props.totalPage <= 7
            ? [1, props.currentPage, props.totalPage]
            : [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                props.totalPage,
                props.currentPage,
                props.currentPage + 1,
                props.currentPage + 2,
              ]
          : props.currentPage >= props.totalPage - 6
          ? [
              1,
              props.totalPage - 1,
              props.totalPage - 2,
              props.totalPage - 3,
              props.totalPage - 4,
              props.totalPage - 5,
              props.totalPage - 6,
              props.currentPage,
              props.totalPage,
            ]
          : [
              1,
              props.totalPage,
              props.currentPage,
              props.currentPage - 1,
              props.currentPage + 1,
              props.currentPage - 2,
              props.currentPage + 2,
            ]
              .filter((n) => n >= 1 && n <= props.totalPage)
              .sort((a, b) => a - b)
      ).reduce((prev, current, index, array) => {
        prev.push(current);
        array[index + 1] !== undefined &&
          array[index + 1] - array[index] > 1 &&
          prev.push("...");
        // array[index + 1] !== undefined &&
        //   array[index + 1] - array[index] > 1 &&
        //   prev.push("...");
        return prev;
      }, []);
    });

    const onClickPage = (n) => {
      if (n >= 1 && n <= props.totalPage) {
        context.emit("update:currentPage", n);
      }
    };
    return {
      pages,
      onClickPage,
    };
  },
};
</script>
