import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createWebHashHistory, createRouter } from "vue-router";
import Test from "./components/test.vue";
import Button from "./components/Button.vue";

const history = createWebHashHistory();
const router = createRouter({
  history: history,
  routes: [
    {
      path: "/",
      component: Test,
    },
    {
      path: "/button",
      component: Button,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
