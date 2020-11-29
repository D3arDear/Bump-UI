import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/views/Home.vue";
import Doc from "./components/views/Doc.vue";
import SwitchDemo from "./components/Switch.Demo.vue";
import ButtonDemo from "./components/Button.Demo.vue";
import DocDemo from "./components/Doc.demo.vue";
import DialogDemo from "./components/Dialog.demo.vue";
import TabsDemo from "./components/Tabs.demo.vue";
const history = createWebHashHistory();
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
        {
          path: "",
          component: DocDemo,
        },
        {
          path: "switch",
          component: SwitchDemo,
        },
        {
          path: "button",
          component: ButtonDemo,
        },
        {
          path: "dialog",
          component: DialogDemo,
        },
        {
          path: "tabs",
          component: TabsDemo,
        },
      ],
    },
  ],
});
