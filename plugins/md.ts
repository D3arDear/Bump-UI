// @ts-nocheck
import path from "path";
import fs from "fs";
import marked from "marked";
import hljs from "highlight.js";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

const mdToJs = (str) => {
  const content = JSON.stringify(marked(str));
  return `export default ${content}`;
};

export function md() {
  return {
    configureServer: [
      // 用于开发
      async ({ app }) => {
        app.use(async (ctx, next) => {
          // koa
          if (ctx.path.endsWith(".md")) {
            ctx.type = "js";
            const filePath = path.join(process.cwd(), ctx.path);
            ctx.body = mdToJs(fs.readFileSync(filePath).toString());
          } else {
            await next();
          }
        });
      },
    ],
    transforms: [
      {
        // 用于 rollup // 插件
        test: (context) => context.path.endsWith(".md"),
        transform: ({ code }) => mdToJs(code),
      },
    ],
  };
}
