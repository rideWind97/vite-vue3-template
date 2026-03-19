export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // commit 类型枚举
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档变更
        "style", // 代码格式（不影响功能）
        "refactor", // 重构（既不是新增功能，也不是修复 bug）
        "perf", // 性能优化
        "test", // 添加测试
        "build", // 构建系统或外部依赖变更
        "ci", // CI 配置变更
        "chore", // 其他杂项
        "revert", // 回退
      ],
    ],
    // subject 不能为空
    "subject-empty": [2, "never"],
    // type 不能为空
    "type-empty": [2, "never"],
    // subject 最大长度 100
    "subject-max-length": [2, "always", 100],
  },
};
