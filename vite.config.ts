import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import unFonts from "unplugin-fonts/vite";
import { googleFontsFullStyles } from "./src/assets/js/fonts";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 从 env/ 目录加载环境变量（analyze 模式使用 production 环境变量）
  const envMode = mode === "analyze" ? "production" : mode;
  const env = loadEnv(envMode, "./env");
  const isProd = mode === "production" || mode === "analyze";
  const isAnalyze = mode === "analyze";

  return {
    plugins: [
      vue(),
      tailwindcss(),
      unFonts({
        google: {
          families: [
            { name: "Poppins", styles: googleFontsFullStyles },
            { name: "Space Grotesk", styles: googleFontsFullStyles },
            { name: "Tiny5", styles: googleFontsFullStyles },
            { name: "Hauora", styles: googleFontsFullStyles },
            { name: "Inter", styles: googleFontsFullStyles },
          ],
        },
      }),
      // 打包体积分析（仅在 pnpm build:analyze 时启用）
      isAnalyze &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "stats.html",
        }),
    ],

    // 路径别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    // 指定环境变量文件目录
    envDir: "./env",

    // 使用 oxc 替代已废弃的 esbuild 进行代码转换
    esbuild: false,
    oxc: {},

    // 开发服务器配置
    server: {
      port: 3000,
      open: true,
      // 开发环境代理配置
      proxy: {
        "/api": {
          target: env.VITE_APP_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    build: {
      // 使用 oxc 进行代码压缩（Vite 8 默认值）
      minify: "oxc",
      // 生产环境不生成 sourcemap，开发环境生成
      sourcemap: !isProd,
    },

    // 定义全局常量（可在业务代码中直接使用）
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  };
});
