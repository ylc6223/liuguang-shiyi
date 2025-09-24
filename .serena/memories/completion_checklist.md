# 任务完成检查清单

- 代码质量：
  - [ ] 运行 `pnpm lint` 无错误与警告。
  - [ ] 运行 `pnpm format` 已格式化所有变更文件。
  - [ ] 新增/修改的固定状态已以“数字枚举”定义与使用，无裸字符串/数字。
- 正确性与测试：
  - [ ] 针对核心逻辑补充/更新单元测试（Vitest/Jest）。
  - [ ] `pnpm test` 通过；必要时本地覆盖关键路径。
- 构建与运行：
  - [ ] 相关应用/包可本地启动或构建（如 `pnpm --filter <pkg> dev/build`）。
- 文档与提交：
  - [ ] 如涉及公共 API/组件，补充 Storybook/README。
  - [ ] 提交信息符合 Conventional Commits。
  - [ ] 如有对外版本影响，添加 Changeset（`pnpm changeset`）。