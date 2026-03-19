/**
 * 在浏览器控制台输出构建版本信息
 * 包含：版本号、构建时间、Git commit、运行环境
 */
export function printBuildInfo() {
  const info = {
    version: __APP_VERSION__,
    buildTime: __BUILD_TIME__,
    gitHash: __GIT_HASH__,
    env: __APP_ENV__,
  };

  // 格式化构建时间为本地时间
  const buildDate = new Date(info.buildTime);
  const formattedTime = buildDate.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 使用带样式的 console 输出，醒目美观
  console.log(
    `%c 🚀 ${import.meta.env.VITE_APP_TITLE} %c v${info.version} %c`,
    "background: #35495e; padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff;",
    "background: #41b883; padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff;",
    "background: transparent;",
  );

  console.log(
    `%c Build Time %c ${formattedTime} `,
    "background: #35495e; padding: 1px 5px; border-radius: 3px 0 0 3px; color: #fff;",
    "background: #e7e7e7; padding: 1px 5px; border-radius: 0 3px 3px 0; color: #333;",
  );

  console.log(
    `%c Git Hash   %c ${info.gitHash} `,
    "background: #35495e; padding: 1px 5px; border-radius: 3px 0 0 3px; color: #fff;",
    "background: #e7e7e7; padding: 1px 5px; border-radius: 0 3px 3px 0; color: #333;",
  );

  console.log(
    `%c Env        %c ${info.env} `,
    "background: #35495e; padding: 1px 5px; border-radius: 3px 0 0 3px; color: #fff;",
    `background: ${info.env === "production" ? "#f56c6c" : "#409eff"}; padding: 1px 5px; border-radius: 0 3px 3px 0; color: #fff;`,
  );
}
