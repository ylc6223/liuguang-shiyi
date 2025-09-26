# 技术方案（V1）— 国风历史 CMS 与站点

本文覆盖架构、模型与枚举、接口契约、页面与模块、测试与验收、里程碑。所有固定状态/类别使用 TypeScript 数字枚举，严禁裸字符串/数字。

## 架构与技术栈
- Monorepo：pnpm + Turborepo。
- 前台（apps/web-guofeng）：Next.js 15（Turbopack），Tailwind v4，shadcn 组件（复用 `@packages/ui`）。
- 后台（apps/admin-umi）：Umi 4 + Vite，Tailwind v4，shadcn（复用 `@packages/ui`）；已提供基础仪表盘骨架。
- 组件库（packages/ui）：基于 shadcn + Radix，统一样式与交互；Tailwind preset 由 `@packages/tailwind-config` 下发。
- 质量：ESLint、TypeScript 严格模式、Vitest、Storybook；CI 建议按改动图构建与测试。

## 领域模型与枚举（必须用数字枚举）
```ts
// 朝代（简化，后续可补充）
export enum Dynasty {
  Xia = 1,
  Shang = 2,
  Zhou = 3,
  Qin = 4,
  Han = 5,
  WeiJin = 6,
  Sui = 7,
  Tang = 8,
  Song = 9,
  Yuan = 10,
  Ming = 11,
  Qing = 12,
}

// 内容类型
export enum ContentType {
  Event = 1,
  Person = 2,
  Dynasty = 3,
  Collection = 4,
}

// 事件类别（示例）
export enum EventCategory {
  War = 1,
  Reform = 2,
  Culture = 3,
  Diplomacy = 4,
  Invention = 5,
  Disaster = 6,
}

// 人物角色（示例）
export enum PersonRole {
  Emperor = 1,
  General = 2,
  Scholar = 3,
  Politician = 4,
  Diplomat = 5,
  Other = 9,
}

// 发布可见性与审核状态
export enum Visibility {
  Private = 1,
  Unlisted = 2,
  Public = 3,
}

export enum ReviewStatus {
  Draft = 1,
  InReview = 2,
  Published = 3,
  Archived = 4,
}

// 媒体类型
export enum MediaType {
  Image = 1,
  Video = 2,
  Audio = 3,
}

// 用户角色
export enum UserRole {
  Admin = 1,
  Editor = 2,
  Reviewer = 3,
  Viewer = 4,
}

// 错误码（示例）
export enum ErrorCode {
  Ok = 0,
  BadRequest = 1001,
  Unauthorized = 1002,
  Forbidden = 1003,
  NotFound = 1004,
  Conflict = 1005,
  RateLimited = 1006,
  InternalError = 1500,
}

// 公共类型
export type ID = string

export type Pagination = {
  page: number
  pageSize: number
}

export type PageResult<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// 实体模型（核心字段）
export type Tag = {
  id: ID
  name: string
  slug: string
}

export type Media = {
  id: ID
  type: MediaType
  url: string
  title?: string
  description?: string
  width?: number
  height?: number
}

export type Person = {
  id: ID
  name: string
  role: PersonRole
  bornYear?: number
  diedYear?: number
  dynasty?: Dynasty
  avatar?: ID // Media.id
  summary?: string
  tags?: ID[] // Tag.id
  visibility: Visibility
  reviewStatus: ReviewStatus
}

export type Event = {
  id: ID
  title: string
  year: number
  dynasty?: Dynasty
  category: EventCategory
  location?: string
  cover?: ID // Media.id
  persons?: ID[] // Person.id
  tags?: ID[] // Tag.id
  content: string // MDX/富文本
  visibility: Visibility
  reviewStatus: ReviewStatus
}

export type DynastyEntry = {
  id: ID
  key: Dynasty
  name: string
  startYear?: number
  endYear?: number
  summary?: string
}

export type Collection = {
  id: ID
  title: string
  cover?: ID
  items: { id: ID; type: ContentType }[]
  visibility: Visibility
  reviewStatus: ReviewStatus
}

export type AuditLog = {
  id: ID
  actorId: ID
  action: string
  targetType: ContentType
  targetId: ID
  createdAt: string
}
```

## 接口契约（示例 REST，便于 Mock/落地）
说明：首期可由 Next.js Route Handlers/Mock 提供；未来可迁移到独立后端。统一使用 `ErrorCode`。

```http
GET   /api/events                -> PageResult<Event>
POST  /api/events                -> { code: ErrorCode; data?: Event }
GET   /api/events/:id            -> Event
PATCH /api/events/:id            -> { code: ErrorCode; data?: Event }
DELETE /api/events/:id           -> { code: ErrorCode }

GET   /api/persons               -> PageResult<Person>
POST  /api/persons               -> { code: ErrorCode; data?: Person }
...

GET   /api/tags                  -> Tag[]
POST  /api/upload                -> { code: ErrorCode; data?: Media }

POST  /api/auth/login            -> { code: ErrorCode; token?: string; role?: UserRole }
GET   /api/auth/me               -> { code: ErrorCode; user?: { id: ID; role: UserRole } }
```

鉴权：
- 后台：登录后携带 `Authorization: Bearer <token>`；路由守卫基于 `UserRole`。
- 前台：公开读取接口以 `Public` 可见性为准；管理接口禁止匿名。

错误与重试：
- 返回 `{ code: ErrorCode; message?: string }`；前端按 `ErrorCode` 分类处理；幂等写操作需提供 `Idempotency-Key`（后置）。

## 模块设计
### apps/admin-umi（CMS 后台）
- 登录页：表单校验（zod + RHF）、本地 token 存储；已具备样板。
- 仪表盘：指标卡（草稿/待审/已发布）、最近编辑表、快捷操作；已具备基础布局（`src/layouts/dashboard-layout.tsx`，Tabs/侧边栏）。
- 内容管理：
  - 列表页：分页、筛选（`ReviewStatus`、`Visibility`、`Dynasty` 等），批量操作（改状态）。
  - 编辑页：基础表单 + 图片上传 + 关联选择；草稿保存、提交审核、发布/下线。
- 权限：`UserRole` 控制可见菜单与操作按钮。
- 观测：页面错误边界、空态与加载态。

### apps/web-guofeng（前台站点）
- 首页：精选专题（Collection）、最新事件、人气人物、时间线预览模块。
- 时间线：按 `Dynasty`/世纪聚合，提供 `EventCategory` 筛选。
- 详情页：事件/人物；关联跳转（人物 ↔ 事件 ↔ 朝代 ↔ 集合）。
- 搜索：关键字 + 筛选（朝代/标签/类别）。
- SEO：头部 meta/OG，结构化数据（后置）。

## 性能与可用性
- 前台：
  - 列表/详情优先 SSG/ISR（增量再生成），减少 TTFB；图片 next/image，加占位与 lazy。
  - 分块路由与组件层级拆分，避免巨组件；保证单文件 < 300 行。
- 后台：
  - 懒加载路由，表格虚拟化（后置）；表单与上传乐观 UI。

## 测试与验收
- 单元：
  - 类型与工具函数（packages/utils）；UI 组件（packages/ui）关键交互；表单校验（zod）。
- 组件/交互：
  - 关键组件（时间线卡、详情模块、后台表单/表格）用 Testing Library 断言渲染与交互。
- 集成/E2E：
  - Playwright：前台首页/时间线/详情加载可用；后台登录与创建草稿 → 提交审核 → 发布流程跑通（可使用 Mock）。
- 验收用例（选摘）：
  - 创建事件：必填缺失提示；保存草稿成功；提交审核角色受限；发布后前台可见。
  - 列表筛选：按朝代/标签/状态筛选正确；分页总数一致。
  - 权限：编辑无权发布；审核者不可删除；匿名不可访问后台路由。

## 里程碑与任务拆解（摘要）
- M1（信息架构与首发能力）
  - 后台：完成模型枚举与表单/列表样板；仪表盘指标卡；登录守卫。
  - 前台：首页/时间线/详情样板；静态数据/Mock API；基础 SEO。
- M2（工作流与检索）
  - 审核流（`ReviewStatus` 全链路）与发布/下线；前台筛选与搜索。
- M3（体验与性能）
  - 移动端细化、可视化优化（时间线）、专题合集页、观测与埋点。

## 与仓库现状的映射
- 已有：
  - `apps/admin-umi`：Tailwind + shadcn UI、登录与仪表盘基础布局、Tabs/侧边栏样板。
  - `apps/web-guofeng`：Next 15、Tailwind、shadcn 配置与 Storybook；design tokens 预设。
- 待做：按上文模块细化 CRUD、工作流与前台页面与接口。

