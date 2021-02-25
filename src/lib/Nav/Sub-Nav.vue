<template>
  <div
    class="BUI-Sub-Nav"
    :class="{ active, vertical }"
    v-click-outside="close"
  >
    <span class="BUI-Sub-Nav__label" @click="onClick">
      <slot name="title"></slot>
      <span class="BUI-Sub-Nav__icon" :class="{ open, vertical }">
        <Icon name="right"></Icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div class="BUI-Sub-Nav__popover" v-show="open" :class="{ vertical }">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <transition name="BUI-animation--slide-top">
        <div class="BUI-Sub-Nav__popover" v-show="open">
          <slot></slot>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts">
import { AppContext, computed, getCurrentInstance, inject, ref } from 'vue';
import Icon from "../Icon.vue";
import { EventBusType } from '../common/eventBus';
export default {
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
  components: { Icon },
  name: "ZealotSubNav",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const eventBus = inject<EventBusType>("EventBus");
    const vertical = inject<boolean>('vertical')
    const root = inject('root')
    const namePath = inject<string[]>('namePath')
    const parent = getCurrentInstance().parent;


    const open = ref(false)


    const active = computed(() => {
      return namePath.indexOf(props.name) >= 0 ? true : false;
    })
    const enter = (el, done) => {
      let { height } = el.getBoundingClientRect();
      el.style.height = 0;
      // 120
      el.getBoundingClientRect();
      // 中间卡个东西让他重新计算
      el.style.height = `${height}px`;
      //多次合并赋值
      el.addEventListener("transitionend", () => {
        done();
      });
    }

    const leave = (el, done) => {
      let { height } = el.getBoundingClientRect();
      el.style.height = `${height}px`;
      el.getBoundingClientRect();
      el.style.height = 0;
      el.addEventListener("transitionend", () => {
        done();
      });
    }

    const afterLeave = (el) => {
      el.style.height = "auto";
    }

    const afterEnter = (el) => {
      el.style.height = "auto";
    }

    const onClick = () => {
      open.value = !open.value;
    }
    const close = () => {
      open.value = false;
    }
    const updateNamePath = () => {
      const newNamePath = [props.name, ...namePath]
      eventBus.emit('update:namePath', newNamePath)
      if (parent.proxy.updateNamePath) {
        parent.proxy.updateNamePath();
      } else {
        // this.root.namePath=[]
      }
    }

    return {
      open,
      vertical,
      eventBus,
      root,
      active, enter, afterLeave, afterEnter, leave, onClick, close, updateNamePath,
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>
