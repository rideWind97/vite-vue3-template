import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unFonts from "unplugin-fonts/vite";
import { googleFontsFullStyles } from "./src/assets/js/fonts";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
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
  ],

  // 使用 oxc 替代已废弃的 esbuild 进行代码转换
  esbuild: false,
  oxc: {},

  build: {
    // 使用 oxc 进行代码压缩（Vite 8 默认值）
    minify: "oxc",
  },
});
