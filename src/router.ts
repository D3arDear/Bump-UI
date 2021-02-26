import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/views/Home.vue";
import Doc from "./components/views/Doc.vue";
import SwitchDemo from "./components/SwitchDemo/Switch.demo.vue";
import ButtonDemo from "./components/ButtonDemo/Button.demo.vue";
import DialogDemo from "./components/DialogDemo/Dialog.demo.vue";
import TabsDemo from "./components/TabsDemo/Tabs.demo.vue";
import IconDemo from "./components/IconDemo/Icon.demo.vue";
import CascaderDemo from "./components/CascaderDemo/Cascader.demo.vue";
import PopoverDemo from "./components/PopoverDemo/Popover.demo.vue";
import ToastDemo from "./components/ToastDemo/Toast.demo.vue";
import CollapseDemo from "./components/CollapseDemo/Collapse.demo.vue";
import TableDemo from "./components/TableDemo/Table.demo.vue";
import ScrollDemo from "./components/ScrollDemo/Scroll.demo.vue";
import SlideDemo from "./components/SlideDemo/Slide.demo.vue";
import StickyDemo from "./components/StickyDemo/Sticky.demo.vue";
import PagerDemo from "./components/PagerDemo/Pager.demo.vue";
import LayoutDemo from "./components/LayoutDemo/Layout.demo.vue";
import GridDemo from "./components/GridDemo/Grid.demo.vue";
import InputDemo from "./components/InputDemo/Input.demo.vue";
import DatePickerDemo from "./components/DatePickerDemo/DatePicker.demo.vue";
import NavDemo from "./components/NavDemo/Nav.demo.vue";
import WaterfallDemo from "./components/WaterfallDemo/Waterfall.demo.vue";
import SelectorDemo from "./components/SelectorDemo/Selector.demo.vue";

import { h } from "vue";
import Markdown from "./components/Markdown.vue";
import intro from "./markdown/intro.md";
import getStarted from "./markdown/get-started.md";
import install from "./markdown/install.md";
import vueMarkdown from "./markdown/Vue3Markdown.md";

const history = createWebHashHistory();

const md = (string) => h(Markdown, { content: string, key: string });
// 想了一个法子通过 h 函数渲染 Markdown.vue 传入相应路径调用相应 markdown

export const router = createRouter({
  history: history,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/doc",
      component: Doc,
      children: [
        { path: "", redirect: "/doc/intro" },
        { path: "intro", component: md(intro) },
        { path: "get-started", component: md(getStarted) },
        { path: "install", component: md(install) },
        { path: "mynote", component: md(vueMarkdown) },
        { path: "layout", component: LayoutDemo },
        { path: "switch", component: SwitchDemo },
        { path: "button", component: ButtonDemo },
        { path: "dialog", component: DialogDemo },
        { path: "tabs", component: TabsDemo },
        { path: "icon", component: IconDemo },
        { path: "cascader", component: CascaderDemo },
        { path: "popover", component: PopoverDemo },
        { path: "toast", component: ToastDemo },
        { path: "collapse", component: CollapseDemo },
        { path: "table", component: TableDemo },
        { path: "scroll", component: ScrollDemo },
        { path: "slide", component: SlideDemo },
        { path: "sticky", component: StickyDemo },
        { path: "pager", component: PagerDemo },
        { path: "grid", component: GridDemo },
        { path: "input", component: InputDemo },
        { path: "datepicker", component: DatePickerDemo },
        { path: "nav", component: NavDemo },
        { path: "waterfall", component: WaterfallDemo },
        { path: "selector", component: SelectorDemo },
      ],
    },
  ],
});
