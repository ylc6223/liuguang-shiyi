# Vben packages 目录结构与职责说明（参考 vue-vben-admin 最新版）

> 本文档基于 vbenjs/vue-vben-admin 仓库 `packages/` 目录的最新结构进行梳理，按分组列出所有子包及其作用，便于在本仓库进行对齐与复用。仅作结构与职责说明，不涉及实现细节。

## 顶层分组总览

- `@core`（核心基座及 UI 组件基建）
- `constants`（通用常量）
- `effects`（含副作用/耦合的功能模块聚合）
- `icons`（图标集合）
- `locales`（多语言资源）
- `preferences`（用户偏好体系封装）
- `stores`（全局状态与 Pinia 仓库）
- `styles`（通用样式，继承 design 基座）
- `types`（通用类型，继承 typings 基座）
- `utils`（通用工具函数，继承 shared 基座）

---

## 详细结构与说明

### 1. @core（核心基座）

目录结构（节选）：

- `packages/@core/base`
  - `@vben-core/design`：设计与基础样式基座（样式、变量、设计系统）。
  - `@vben-core/icons`：核心图标集合（基础图标资源）。
  - `@vben-core/shared`：核心共享能力（工具、常量等被上层复用）。
  - `@vben-core/typings`：核心基础类型定义。
- `packages/@core/composables`
  - `@vben-core/composables`：Vue 组合式通用方法（与 UI/业务无关的基础组合函数）。
- `packages/@core/preferences`
  - `@vben-core/preferences`：用户偏好体系核心（存储、持久化策略、统一接口）。
- `packages/@core/ui-kit`
  - `@vben-core/form-ui`：表单相关 UI 基础能力与封装。
  - `@vben-core/layout-ui`：布局相关 UI 结构组件（管理布局“引擎”）。
  - `@vben-core/menu-ui`：菜单相关 UI 组件。
  - `@vben-core/popup-ui`：弹出层/浮层类 UI 组件。
  - `@vben-core/shadcn-ui`：基于 shadcn 的 UI 适配与封装。
  - `@vben-core/tabs-ui`：页签（Tab）相关 UI 组件。

作用说明：
- 提供“稳定、可被复用”的基座能力，上层包尽可能通过这些基座实现扩展与装配。
- 不承载业务逻辑；后续可能独立发布为 npm 包。

---

### 2. constants / types / utils / styles / icons（应用级通用层）

- `@vben/constants`：应用通用常量；继承 `@vben-core/shared/constants` 能力。
- `@vben/types`：应用通用类型；继承 `@vben-core/typings` 能力。
- `@vben/utils`：应用通用工具函数；继承 `@vben-core/shared/utils` 能力。
- `@vben/styles`：应用通用样式；继承 `@vben-core/design` 能力。
- `@vben/icons`：应用通用图标；继承 `@vben-core/icons` 能力。

作用说明：
- 面向多个 app 的“公共层”，在 core 基座之上聚合业务无关的可复用内容。

---

### 3. locales（多语言）

- `@vben/locales`：i18n 词条与相关适配。

作用说明：
- 为各 app 提供统一的多语言资源入口与组织方式。

---

### 4. preferences（偏好封装）

- `@vben/preferences`：在 `@vben-core/preferences` 之上的应用封装，面向 app 的偏好管理。

作用说明：
- 统一管理用户偏好设置（主题、布局偏好、行为配置等），含持久化策略。

---

### 5. stores（全局状态）

- `@vben/stores`：Pinia 全局状态与模块集合。

作用说明：
- 组织跨页面/跨模块的全局状态（如用户信息、权限、标签页状态等）。

---

### 6. effects（副作用聚合目录）

定位（摘自上游 README）：
- 存放与轻微耦合相关的代码与逻辑，例如：
  - 状态管理相关副作用（异步、API 调用）。
  - 偏好设置（localStorage 等持久化策略）。
  - 导航与路由驱动逻辑。
  - 依赖特定组件库或较大依赖的功能模块。

子包结构与作用：
- `@vben/access`（packages/effects/access）
  - 作用：权限与访问控制相关封装（指令、路由守卫、能力判断等）。
- `@vben/common-ui`（packages/effects/common-ui）
  - 作用：常用 UI 效果模块聚合（如 tippy、loading 等组件/指令），与多库协同。
- `@vben/hooks`（packages/effects/hooks）
  - 作用：包含副作用的 hooks（如监听、watermark 等），在应用层复用。
- `@vben/layouts`（packages/effects/layouts）
  - 作用：将各 UI 基座通过插槽/装配生成“通用仪表盘布局”的装配层（如 BasicLayout）。
- `@vben/plugins`（packages/effects/plugins）
  - 作用：第三方库插件整合（按 subpath 导出，避免未使用插件造成体积负担）。
  - 典型子路径导出（示例）：`./echarts`、`./vxe-table`、`./motion`。
- `@vben/request`（packages/effects/request）
  - 作用：HTTP 请求层（axios 封装、拦截器、错误处理、与 locales/utils 的协作）。

---

### 7. 其它分组汇总

- `@vben/locales`：多语言资源
- `@vben/stores`：全局状态
- 见上各节，不再重复。

---

## 目录树（节选，至二级）

```
packages/
├─ @core/
│  ├─ base/
│  │  ├─ design → @vben-core/design
│  │  ├─ icons → @vben-core/icons
│  │  ├─ shared → @vben-core/shared
│  │  └─ typings → @vben-core/typings
│  ├─ composables → @vben-core/composables
│  ├─ preferences → @vben-core/preferences
│  └─ ui-kit/
│     ├─ form-ui → @vben-core/form-ui
│     ├─ layout-ui → @vben-core/layout-ui
│     ├─ menu-ui → @vben-core/menu-ui
│     ├─ popup-ui → @vben-core/popup-ui
│     ├─ shadcn-ui → @vben-core/shadcn-ui
│     └─ tabs-ui → @vben-core/tabs-ui
├─ constants → @vben/constants
├─ effects/
│  ├─ access → @vben/access
│  ├─ common-ui → @vben/common-ui
│  ├─ hooks → @vben/hooks
│  ├─ layouts → @vben/layouts
│  ├─ plugins → @vben/plugins
│  └─ request → @vben/request
├─ icons → @vben/icons
├─ locales → @vben/locales
├─ preferences → @vben/preferences
├─ stores → @vben/stores
├─ styles → @vben/styles
├─ types → @vben/types
└─ utils → @vben/utils
```

---

## 使用与对齐建议

- 若在本仓库按 vben 结构落地：
  - 基座能力优先放在 `@core` 对应层；应用通用内容放在 `constants/types/utils/styles/icons`。
  - 涉及副作用（请求、权限、路由、第三方插件集成、偏好持久化等）放入 `effects`。
  - 插件（如图表、表格、动效）建议采用“子路径导出”以便按需引入，避免体积冗余。
- 结合本仓库技术栈（React/Umi 等）时，可将“概念与边界”保持一致，具体实现适配对应框架。

> 注：以上基于上游仓库主分支快照，后续若上游结构变更，本文档建议同步更新。

