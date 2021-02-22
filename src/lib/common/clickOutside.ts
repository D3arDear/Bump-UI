// 监听哪个元素被点击了
let onClickDocument = (e) => {
  let { target } = e;
  callbacks.forEach((item) => {
    if (target === item.el || item.el.contains(target)) {
      // 如果就是之前点的元素,那么就什么都不做,交由组件自己处理
      return;
    } else {
      // 否则,关闭这个组件
      item.callback();
      // 如果点击的不是之前被点开的元素,那么久关闭它
    }
  });
};
document.addEventListener("click", onClickDocument);
// 记录点击了哪一个元素,以及他的callback
let callbacks = [];

let removeListener = () => {
  document.removeEventListener("click", onClickDocument);
};

export default {
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
};
