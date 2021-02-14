import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/views/Home.vue";
import Doc from "./components/views/Doc.vue";
import SwitchDemo from "./components/Switch.demo.vue";
import ButtonDemo from "./components/Button.demo.vue";
import DocDemo from "./components/Doc.demo.vue";
import DialogDemo from "./components/Dialog.demo.vue";
import TabsDemo from "./components/Tabs.demo.vue";

import { h } from "vue";
import Markdown from "./components/Markdown.vue";
import intro from "./markdown/intro.md";
import getStarted from "./markdown/get-started.md";
import install from "./markdown/install.md";

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
        { path: "switch", component: SwitchDemo },
        { path: "button", component: ButtonDemo },
        { path: "dialog", component: DialogDemo },
        { path: "tabs", component: TabsDemo },
      ],
    },
  ],
});
