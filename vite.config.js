import path from "path";
const pathSrc = path.resolve(__dirname, "./src");
module.exports = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "${pathSrc}/components/lib/style/theme.scss";
        `,
      },
    },
  },
};
