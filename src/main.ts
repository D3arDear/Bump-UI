import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import Markdown from "./components/Markdown.vue";
import "./lib/style/theme.scss";
import "github-markdown-css";
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/atom-one-dark-reasonable.css";

const app = createApp(App);

app.use(router);
app.use(VueHighlightJS);
app.mount("#app");
app.component("Markdown", Markdown);
// 全局注册 Markdown 用于在 router 里调用
