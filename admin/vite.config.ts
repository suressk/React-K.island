import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import styleImport from "vite-plugin-style-import";

import { resolve } from "path";
/**
 * 获取绝对路径
 * @param dir 文件路径
 * @returns {string}
 */
const resolvePath = (dir: string): string => resolve(__dirname, ".", dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name: string) => `antd/es/${name}/style/css`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolvePath("src"),
      "@components": resolvePath("src/components"),
      "@common": resolvePath("src/common"),
      "@utils": resolvePath("src/utils"),
      "@store": resolvePath("src/store"),
      "@locales": resolvePath("src/locales"),
      "@views": resolvePath("src/views"),
    },
  },
  server: {
    port: 10024,
  },
});
