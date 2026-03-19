/// <reference types="vite/client" />

// 必须有顶层 export，才能让 declare module 成为「模块增强」而非「模块覆盖」
export {};

/** 自定义环境变量类型声明 */
declare global {
  interface ImportMetaEnv {
    /** 应用标题 */
    readonly VITE_APP_TITLE: string;
    /** API 基础路径 */
    readonly VITE_APP_BASE_API: string;
    /** 当前环境标识：development | production */
    readonly VITE_APP_ENV: string;
    /** 开发环境代理目标地址 */
    readonly VITE_APP_PROXY_TARGET: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  /** 全局常量（在 vite.config.ts 中通过 define 定义） */
  const __APP_ENV__: string;
  /** 应用版本号（来自 package.json version） */
  const __APP_VERSION__: string;
  /** 构建时间（ISO 格式） */
  const __BUILD_TIME__: string;
  /** Git commit hash（短） */
  const __GIT_HASH__: string;
}

/** 路由 meta 类型扩展 */
declare module "vue-router" {
  interface RouteMeta {
    /** 页面标题 */
    title?: string;
    /** 是否无需登录即可访问 */
    noAuth?: boolean;
  }
}
