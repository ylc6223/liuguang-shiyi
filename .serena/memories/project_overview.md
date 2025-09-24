# 项目概览

- 目标与定位：本仓库是一个以 React 生态为核心的 Monorepo，包含两个应用与若干共享包：
  - 古风网站（Next.js，`apps/web-guofeng`）：面向公众的展示站点。
  - 后台管理（Umi 4，`apps/admin-umi`）：用于内容发布与运营的管理端。
  - 共享包（`packages/*`）：UI 组件库、设计令牌、工具函数、统一 ESLint/TS 配置等。
- 技术栈：Node 20–22、pnpm workspaces、Turborepo、TypeScript、Next.js 15、Umi 4、Tailwind CSS v4、Storybook 8、Vitest（测试）、ESLint + Prettier、Changesets（版本与变更）。
- 包管理与任务编排：pnpm + Turborepo。根脚本负责跨包并行与缓存，子包定义自身的 `dev/build/test/lint/format/storybook`。
- 结构约定：
  - 应用：`apps/web-guofeng`、`apps/admin-umi`
  - 包：`packages/ui`、`packages/design-tokens`、`packages/utils`、`packages/eslint-config`、`packages/tsconfig`
  - 其他：`docs/`、`scripts/`、`.github/`（CI）
- 运行与构建：通过根脚本或按包过滤执行（见 suggested_commands.md）。
- 质量控制：ESLint、TS 严格模式、Prettier；CI 要求 lint/构建/测试通过。
