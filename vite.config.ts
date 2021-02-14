import path from "path";
import fs from "fs";
const pathSrc = path.resolve(__dirname, "./src/components/lib/style");
console.log(pathSrc);
const pathSrc2 = "./src/components/lib/style/test.scss";

module.exports = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/components/lib/style/theme";`,
      },
    },
  },
};
