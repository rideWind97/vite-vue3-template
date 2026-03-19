import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default tseslint.config(
  // 忽略的文件/目录
  {
    ignores: ["dist/**", "node_modules/**", "stats.html", "*.d.ts"],
  },

  // JavaScript 基础规则
  js.configs.recommended,

  // TypeScript 推荐规则
  ...tseslint.configs.recommended,

  // Vue 推荐规则
  ...pluginVue.configs["flat/recommended"],

  // Vue 文件使用 TypeScript 解析器
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // 浏览器全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 自定义规则
  {
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Vue
      "vue/multi-word-component-names": "off", // 允许单词组件名（如 Home.vue）
      "vue/no-v-html": "off",

      // 通用
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },
);
