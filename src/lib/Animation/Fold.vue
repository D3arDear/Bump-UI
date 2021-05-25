<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div v-show="visible">
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  name: "BUI-Fold",
  props: {
    visible: { type: Boolean, required: true },
    horizontal: { type: Boolean, default: false },
    duration: { type: [Number, String], default: 300 },
  },
  data() {
    return {
      state: {
        paddingTop: "",
        paddingBottom: "",
        paddingRight: "",
        paddingLeft: "",
        overFlow: "",
      },
    };
  },
  computed: {
    transition() {
      return this.horizontal
        ? `${this.duration}ms width ease-in-out, ${this.duration}ms padding-left ease-in-out, ${this.duration}ms padding-right ease-in-out`
        : `${this.duration}ms height ease-in-out, ${this.duration}ms padding-top ease-in-out, ${this.duration}ms padding-bottom ease-in-out`;
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.transition = this.transition;
      this.state[this.horizontal ? "paddingLeft" : "paddingTop"] =
        el.style[this.horizontal ? "paddingLeft" : "paddingTop"];
      this.state[this.horizontal ? "paddingRight" : "paddingBottom"] =
        el.style[this.horizontal ? "paddingRight" : "paddingBottom"];
      el.style[this.horizontal ? "width" : "height"] = 0;
      el.style[this.horizontal ? "paddingLeft" : "paddingTop"] = 0;
      el.style[this.horizontal ? "paddingRight" : "paddingBottom"] = 0;
    },
    enter(el, done) {
      this.state.overFlow = el.style.overflow;
      if (this.horizontal) {
        el.scrollWidth !== 0
          ? (el.style.width = `${el.scrollWidth}px`)
          : (el.style.width = "");
        el.style.paddingLeft = this.state.paddingLeft;
        el.style.paddingRight = this.state.paddingRight;
      } else {
        el.scrollWidth !== 0
          ? (el.style.width = `${el.scrollWidth}px`)
          : (el.style.width = "");
        if (el.scrollHeight !== 0) {
          el.style.height = `${el.scrollHeight}px`;
        } else {
          el.style.height = "";
        }
        el.style.paddingTop = this.state.paddingTop;
        el.style.paddingBottom = this.state.paddingBottom;
      }
      el.style.overflow = "hidden";
    },
    afterEnter(el) {
      el.style.transition = "";
      el.style.overflow = this.state.overFlow;
      this.horizontal ? (el.style.width = "") : (el.style.height = "");
    },

    beforeLeave(el) {
      this.state.overFlow = el.style.overflow;
      this.state[this.horizontal ? "paddingLeft" : "paddingTop"] =
        el.style[this.horizontal ? "paddingLeft" : "paddingTop"];
      this.state[this.horizontal ? "paddingRight" : "paddingBottom"] =
        el.style[this.horizontal ? "paddingRight" : "paddingBottom"];
      el.style[this.horizontal ? "width" : "height"] = `${
        el[this.horizontal ? "scrollWidth" : "scrollHeight"]
      }px`;
      el.style.overflow = "hidden";
    },
    leave(el, done) {
      el.style.transition = this.transition;
      el.style[this.horizontal ? "width" : "height"] = 0;
      el.style[this.horizontal ? "paddingLeft" : "paddingTop"] = 0;
      el.style[this.horizontal ? "paddingRight" : "paddingBottom"] = 0;
    },
    afterLeave(el) {
      el.style.transition = "";
      el.style.overflow = this.state.overFlow;
      el.style[this.horizontal ? "width" : "height"] = "";
      el.style[this.horizontal ? "paddingLeft" : "paddingTop"] = this.state[
        this.horizontal ? "paddingLeft" : "paddingTop"
      ];
      el.style[this.horizontal ? "paddingRight" : "paddingBottom"] = this.state[
        this.horizontal ? "paddingRight" : "paddingBottom"
      ];
    },
  },
};
</script>
