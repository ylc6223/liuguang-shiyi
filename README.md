 # Monorepo 架构设计（React）
 
本仓库将演进为一个以 React 为核心的 Monorepo，包含三类工作区：
- 古风网站（Next.js）：展示中国历史事件、人物与发展脉络的前台站点。
- 后台管理系统（Umi）：用于发布与运营内容的管理端（页面由你自定义）。
 - 共享依赖：组件库、设计系统、工具集与统一工程配置。
 
 ## 技术选型（建议）
 - 包管理与工作区：pnpm workspaces + Turborepo（并行构建、缓存、任务编排）。
- 应用框架：
  - 古风网站：Next.js（SSR/SSG、路由、SEO 友好）。
  - 管理后台：Umi 4（企业级路由/插件体系、集成度高）。
 - 语言与样式：TypeScript、Tailwind CSS 或 CSS-in-JS（按团队偏好二选一）。
 - 测试与质量：Vitest/Jest、Testing Library、ESLint、Prettier、Husky + lint-staged。
- 设计系统：shadcn/ui（基于 Radix UI）、Storybook、Design Tokens（Style Dictionary）。
 - 版本与变更：Changesets（独立/对齐版本、CHANGELOG 自动生成）。
 
 ## 仓库结构（约定）
 ```
 .
 ├─ apps/
│  ├─ web-guofeng/        # 古风网站（Next.js）
│  └─ admin-umi/          # 管理后台（Umi 4）
 ├─ packages/
 │  ├─ ui/                 # 组件库（复用组件、Storybook）
 │  ├─ design-tokens/      # 设计令牌（颜色/间距/排版）
 │  ├─ utils/              # 共享工具函数
 │  ├─ eslint-config/      # 统一 ESLint 规则
 │  └─ tsconfig/           # 统一 TS 配置（base/next/node）
 ├─ .github/workflows/     # CI（构建/测试/变更集发布）
 └─ README.md
 ```
 
 ## 边界与依赖关系
 - apps 仅消费 packages，不互相引用；业务逻辑放在对应 app 内。
 - 组件库 `packages/ui` 不耦合具体业务，允许按需引入；设计令牌在 `design-tokens`，由 `ui` 消费并下发到 apps。
 - 公共工具与类型放 `packages/utils` 和 `packages/tsconfig`。
 
## 任务与构建（示例）
- 根目录统一脚本：`dev`（并行启动）、`build`、`test`、`lint`、`format`、`release`（changesets）。
- Turborepo 规则：在每个包定义 `build/test/lint`；根层编排跨包任务与缓存。
- 环境变量：按 app 隔离，示例 `apps/web-guofeng/.env.local`、`apps/admin-umi/.env.local`；共有变量写入 `.env.example`。
- 组件文档：两个应用均已接入 Storybook 脚本（`pnpm --filter @apps/* storybook`）。
 - 组件库 Storybook：`pnpm --filter @packages/ui storybook`（Vite 构建）。
 - Node 版本统一：`.nvmrc` / `.node-version` 固定为 20（CI 亦为 Node 20）。

## 本地开发与启动
- 前置要求：Node 20（建议，已放宽到 22）、pnpm 10。
- 切换 Node：`nvm use` 或 `asdf install && asdf local nodejs 20`。
- 安装依赖：`pnpm install`（如提示构建脚本被忽略，可运行 `pnpm approve-builds`）。
- 并行启动：`pnpm dev`（Turbo 并行启动 web 与 admin）。
- 单独启动应用：
  - 古风站点（Next.js）：`pnpm --filter web-guofeng dev`
  - 管理后台（Umi）：`pnpm --filter @apps/admin-umi dev`（使用 `max dev`，当前已切换 Vite 构建）
- 构建产物：
  - 全量：`pnpm build`
  - 单应用：`pnpm --filter web-guofeng build`、`pnpm --filter @apps/admin-umi build`
- Storybook：
  - Next：`pnpm --filter web-guofeng storybook`
  - Umi：`pnpm --filter @apps/admin-umi storybook`
  - 组件库：`pnpm --filter @packages/ui storybook`

## 常用维护命令
- Lint/格式化（并行）：`pnpm lint`、`pnpm format`
- 变更与版本（Changesets）：`pnpm changeset` → `pnpm version-packages`
- 发布（CI 建议执行）：推送到 `main` 触发 `.github/workflows/release.yml`

## 设计系统与组件库
- UI 规范以 Design Tokens 为源，自动生成 CSS 变量/TS 常量；Tailwind v4 作为公共依赖，`@packages/tailwind-config` 提供共享 preset。
- Storybook 驱动组件开发；组件以原子/分子/复合层次组织；提供无障碍与响应式范式。
- 组件变更通过 Changesets 触发发布，apps 升级依赖后验证。

## 前台首页设计（apps/web-guofeng）
- 主页信息架构与交互已沉淀到文档：`docs/web-guofeng-homepage-design.md`
- 当前板块顺序（可配置 `HomeSection/homeSectionOrder`）：
  - Hero → 分类宫格 → 主打专题 → 编辑精选 → 历史长河 → 人物精选 → 最新文章/本周热门 → CTA → 订阅
- 关键交互
  - Hero CTA 改为“专题导览”（跳转 `/topics`），避免与紧随其后的分类宫格重复
  - 历史长河下方提供“查看完整时间轴”（描边金色 + 悬浮填充，跳转 `/timeline`）
  - 订阅按钮配色为金色强调（`#C6A477`）+ 白字

## 测试与质量
 - 单元测试：Vitest/Jest + Testing Library；快照用于结构型组件，谨慎使用。
 - 端到端：Cypress/Playwright（按需求在 apps 中配置）。
 - 质量门禁：ESLint、TypeScript 严格模式、Prettier；CI 强制通过后可合并。

## CI/CD 与部署（参考）
- CI：按变更图选择性构建与测试；推送至主分支触发 release（Changesets + npm registry）。
- 部署：
  - 古风网站：Vercel（Next.js 原生支持，预览环境）。
  - 管理后台：静态产物托管（S3/OSS/静态站点）或同一平台托管。

## 故障排查
- Storybook 版本：已锁定 v8.6.14；若安装失败，确认 `@storybook/*` 版本一致。
- Registry：根目录 `.npmrc` 将 `@storybook` 指向官方 npm；若使用镜像，仍以官方源为准。
- Node 版本：如遇 Vite/Storybook 兼容告警，优先切回 Node 20。
- Umi 启动：如报 `umi: command not found`，请使用 `max dev`（`@umijs/max` 自带 `max` 可执行文件）。
 - Umi + Vite：已启用 Vite 构建（.umirc.ts 的 `vite: {}`）；若 PostCSS/ESM 配置报错，确认 `@umijs/bundler-vite` 已安装并重新执行 `pnpm dev`。
 
 ## 迁移与创建步骤
 1) 初始化 Monorepo：启用 pnpm workspaces 与 Turborepo，创建 `apps/`、`packages/` 基础目录。
2) 创建两个应用骨架（Next.js 与 Umi），接入统一 ESLint/TS 配置。
 3) 拆分并下沉共享部分至 `packages/`：ui、utils、design-tokens、工程配置。
 4) 接入 Storybook 与 tokens 流水线；为核心组件补充文档与测试。
 5) 配置 CI：按包构建与测试、变更集发布、按 app 部署。
 6) 渐进迁移现有代码至对应 app 与 packages，确保每步可构建与回滚。
 
 ## 决策原则
 - 复用优先：能下沉到 packages 的通用内容尽量下沉。
 - 解耦清晰：apps 间不直接依赖；通过 packages 共享。
 - 性能与可维护性并重：SSR 用于 SEO 场景，后台以 DX 优先。
 - 自动化：脚手架、质量门禁、发布与预览尽可能自动化。
