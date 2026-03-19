import path from "node:path";
import { execSync } from "node:child_process";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import unFonts from "unplugin-fonts/vite";
import { googleFontsFullStyles } from "./src/assets/js/fonts";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json" with { type: "json" };

// 获取 Git commit hash（构建时执行一次）
function getGitCommitHash(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

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

    // Vite 8 默认使用 oxc 进行代码转换（无需额外配置）
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
      // 构建版本信息
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __GIT_HASH__: JSON.stringify(getGitCommitHash()),
    },
  };
});
