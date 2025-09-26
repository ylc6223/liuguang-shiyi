# apps/admin-umi 技术实施计划（对齐 Vben 仪表盘）

本文基于 docs/vben-dashboard-layout-analysis.md，面向 Umi + shadcn + Tailwind v4 的实现，聚焦“通用仪表盘布局”和“工作台/分析页”的 UI 与交互。忽略业务后端，仅完成前端结构与占位交互。所有固定状态/选项使用数字枚举；控制单文件 ≤ 300 行、每层目录 ≤ 8 文件。

## 1. 目标与成功指标（MVP）
- 目标：提供可复用、响应式、可折叠侧栏的后台仪表盘布局；包含搜索、用户菜单、面包屑，以及两个通用仪表盘页面骨架（工作台/分析）。
- 成功指标：
  - 布局：左右两列（侧栏 + 内容）在移动/桌面下表现一致；侧栏折叠/展开、Tooltip 提示、滚动区域正确。
  - 交互：Ctrl/⌘+K 呼出搜索面板；用户菜单可见并可退出；面包屑显示当前层级占位。
  - 页面：完成“工作台（3/5+2/5）”与“分析（概览 + Tabs + 三列卡片）”结构与占位。

## 2. 技术栈与约束
- 框架/样式：Umi 4（Vite）+ TypeScript + Tailwind v4。
- UI：@packages/ui（shadcn 基础组件）+ Tailwind 预设 @packages/tailwind-config。
- 测试：Vitest；可选 Playwright（后置）。
- 规范：中文文档、数字枚举、文件 ≤ 300 行、目录 ≤ 8 文件。

## 3. 布局与结构设计
- 顶部栏 Topbar：
  - 元素：侧栏折叠按钮、品牌名、面包屑或水平菜单（二选一占位）、搜索按钮（CommandDialog）、用户头像下拉。
  - Provider：全局包裹 TooltipProvider，统一 Tooltip 环境。
- 侧边栏 Sidebar：
  - 分组导航（总览/内容/系统），折叠宽度 4rem、展开 16rem；折叠时仅显示图标并通过 Tooltip 展示标题。
  - 滚动区域 ScrollArea，包含品牌区与分组菜单。
- 搜索面板：CommandDialog（Ctrl/⌘+K）；列出导航项并支持键盘选择跳转。
- 内容区：容纳 Outlet；页面内自带自适应网格与间距。

## 4. 数字枚举与常量
```ts
export enum LayoutMode { Sidebar = 1, Mixed = 2, Header = 3 }
export enum SidebarState { Expanded = 1, Collapsed = 2 }
export enum NavSection { Overview = 1, Content = 2, System = 3 }
export enum NavItemKey { Dashboard = 1, Analytics = 2, Workspace = 3, Articles = 4, Media = 5, Users = 6, Settings = 7 }
export enum BreadcrumbMode { Hidden = 1, Visible = 2 }
```

## 5. 组件与文件规划（建议）
- 目录（每层 ≤ 8 文件）：
  - src/layouts/
    - dashboard-layout.tsx（主布局，已存在，继续增强）
  - src/features/navigation/
    - constants.ts（上面枚举与 NAV 数据）
    - side-menu.tsx（可选：侧栏菜单组件，便于拆分 <300 行）
  - src/pages/dashboard/
    - index.tsx（保留总览占位）
    - analytics.tsx（分析页占位：概览 + Tabs + 三列卡）
    - workspace.tsx（工作台占位：3/5 + 2/5）
  - src/providers/
    - ui-providers.tsx（可选：集中放置 TooltipProvider 等，全局包裹）

> 注：若当前单文件将超 300 行，优先拆分 side-menu、topbar 子组件。

## 6. 路由与导航（.umirc.ts）
- 追加路由：
  - /dashboard/analytics → ./dashboard/analytics
  - /dashboard/workspace → ./dashboard/workspace
- 侧栏 NAV 数据映射上述路由，保持 Dashboard（index）、Analytics、Workspace 三入口。

## 7. UI 复用与参考自 vben
- 复用 @packages/ui 组件：Sheet、ScrollArea、Tooltip、DropdownMenu、Avatar、Breadcrumb、Command、Tabs、Card、Table、Badge、Progress。
- 参考/借鉴 vben 概念：
  - 偏好/配置（preferences）思路 → 先期用 localStorage 管理 SidebarState 与 BreadcrumbMode。
  - 工作台与分析页布局比例与模块编排（仅骨架与占位）。

## 8. 开发任务清单（Must）
- 布局层
  - [ ] Topbar：折叠按钮、品牌名、面包屑占位、搜索按钮、用户菜单。
  - [ ] Sidebar：品牌区、分组菜单、折叠/展开、Tooltip 提示、滚动容器。
  - [ ] Provider：TooltipProvider 全局包裹；修复 Tooltip 报错（已修）。
  - [ ] 搜索：CommandDialog + 快捷键；可跳转到 /dashboard/*。
- 页面层
  - [ ] Workspace 占位：
        - Header 卡（问候占位）
        - 左 3/5：项目卡 + 动态占位
        - 右 2/5：快捷导航 + 待办 + 简单图表占位
  - [ ] Analytics 占位：
        - 概览四卡占位
        - Tabs 两页占位（趋势/访问）
        - 底部三列卡占位
- 导航与路由
  - [ ] .umirc.ts 增加 /dashboard/analytics、/dashboard/workspace 路由
  - [ ] NAV 映射三入口（Dashboard / Analytics / Workspace）
- 质量
  - [ ] Vitest：
        - 枚举/常量存在性与基本渲染快照（轻量）
        - 折叠状态切换逻辑（localStorage 读写）
  - [ ] Storybook（可后置）：关键卡片/表单控件/导航项演示

## 9. 里程碑与交付
- M1（布局就绪 | 1–2 天）
  - 完成 Topbar + Sidebar + Provider + 搜索快捷键
  - 路由与 NAV 同步，/dashboard 三入口可导航
- M2（页面骨架 | 1–2 天）
  - workspace/analytics 两页 UI 架构与占位组件
  - 响应式（md/lg）两列布局与间距校验
- M3（质量与可用 | 1 天）
  - Vitest 轻量用例；空态/加载态梳理；可选：E2E 检查

## 10. 性能、可访问性与规范
- 性能：
  - 页面与布局组件拆分，避免巨组件；按需加载图标；不引入额外图表库（先占位）。
- A11y：
  - Tooltip 仅作折叠态辅助；为按钮/菜单提供 aria-label；键盘可达性。
- 规范：
  - 使用数字枚举；常量集中；避免裸值；中文文档。

## 11. 风险与应对
- 侧栏超长菜单滚动与分组视觉密度：通过 ScrollArea 与间距类控制。
- 折叠状态与路由高亮：当前以 Link + path 判断；后续可封装 active 判定函数。
- 若直接借鉴 vben 的部分工具函数：确认兼容性与体积；必要时抽象为本仓 utils。

## 12. 后续增量（Should/Could）
- Should：
  - 路由 Tabbar、偏好抽屉（主题/密度/面包屑开关）
  - 二级菜单与混合双列（side-extra）
- Could：
  - 动态权限菜单接入、埋点与偏好同步

---

> 执行建议：从布局层开始，保证侧栏折叠/搜索/用户菜单与路由三入口可用，再补两页骨架与轻量测试；严格控制文件长度与目录文件数。

