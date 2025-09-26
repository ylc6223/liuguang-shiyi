# Vben 主题系统 → Tailwind CSS v4 主题系统 迁移指南

本指南面向将当前 Vben 主题系统（CSS Variables + Tailwind + SCSS/BEM + Preferences 动态注入）迁移到 Tailwind CSS v4 的 `@theme` 主题变量体系。内容包括完整迁移步骤、保留功能清单、迁移注意事项、新旧差异对比与验证方法，并提供具体技术实现细节与示例。

## 目录
- 1. 迁移目标与范围
- 2. 迁移前准备
- 3. 完整迁移步骤
- 4. 需要保留的核心功能清单
- 5. 迁移关键注意点
- 6. 新旧系统差异对比
- 7. 迁移后的验证方法
- 8. 附：示例参考片段

---

## 1. 迁移目标与范围

- 目标：采用 Tailwind v4 的 `@theme` 指令管理设计令牌（颜色、字体、阴影、间距、圆角、断点、动画等），让“设计令牌 → 工具类/变体”映射由 CSS 顶层声明驱动，替代 v3 时代的 JS 配置为主的主题管理方式，同时与 Vben 的偏好设置（Preferences）与动态 CSS 变量注入机制协同工作。
- 范围：
  - Tailwind 配置从 JS 导出（如 `@vben/tailwind-config`）迁移为 CSS 顶层的 `@import "tailwindcss"; @theme { ... }`。
  - 将 Vben 的设计令牌（如 `--primary`, `--background`, `--radius` 等）映射到 Tailwind v4 规定的主题变量命名空间（如 `--color-*`, `--radius-*`, `--spacing-*` 等）。
  - 保留现有 SCSS/BEM 组织、Preferences 主题切换、动态 CSS 变量更新与 Tailwind 工具类的协同。

---

## 2. 迁移前准备

- 确认 Tailwind 升级至 v4，并支持在 CSS 中使用 `@theme` 指令。
- 盘点项目内现有设计令牌：
  - 来自 `packages/@core/base/design/src/design-tokens/{default.css, dark.css}` 的变量，如 `--background`, `--foreground`, `--primary`, `--radius` 等。
  - 来自 `internal/tailwind-config/src/index.ts` 颜色扩展（primary、secondary、success、warning 等）与 `borderRadius` 绑定到 `--radius` 的用法。
- 识别 Preferences 动态更新逻辑：
  - `packages/@core/preferences/src/update-css-variables.ts` 动态设置 `document.documentElement` 之上的 CSS 变量与 `dataset.theme`、`classList.toggle('dark')`。
  - 动态颜色生成器：`packages/@core/base/shared/src/color/generator.ts`（依赖 theme-colors），输出 `--{name}-{50..700}` 与语义别名如 `--primary`。

---

## 3. 完整迁移步骤

### 步骤1：建立 v4 主题入口CSS
在应用或共享样式入口新建 `app.css`（或在现有入口）：
```css
/* app.css */
@import "tailwindcss";

/* 顶层 @theme 声明默认/企业主题变量 */
@theme {
  /* 颜色命名空间：映射 Vben 设计令牌到 v4 规范 */
  /* 示例：将 vben 的 --primary-500 映射为 v4 的 --color-primary-500 */
  --color-primary-50:  oklch(98% 0.02 260);
  --color-primary-100: oklch(96% 0.04 260);
  /* ... */
  --color-primary-500: oklch(72% 0.12 260);
  --color-primary-700: oklch(58% 0.14 260);

  /* 中性色/背景/前景，参考 vben default.css/dark.css */
  --color-neutral-50:  oklch(98% 0 0);
  /* ... */
  --color-neutral-900: oklch(38% 0 0);

  /* 尺寸/间距命名空间（可按需）：--spacing-* */
  --spacing-4: 1rem;

  /* 圆角命名空间：绑定 vben 的 --radius 到 --radius-* 语义 */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* 字体、字重、行高、字距命名空间，按需补齐 */
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Noto Color Emoji";
  --font-weight-semibold: 600;
  --leading-tight: 1.15;

  /* 阴影命名空间（如需与 vben 保持一致风格） */
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* 自定义组件层，依然支持 @apply，复用工具类与变量 */
@layer components {
  .card-box {
    @apply bg-neutral-50 text-neutral-900 rounded-lg border;
  }
}
```

说明：
- v4 建议通过 `--color-*`, `--radius-*`, `--spacing-*` 等命名空间声明，让 Tailwind 自动生成对应工具类（如 `bg-primary-500`, `rounded-lg`, `px-4`）。
- 顶层 `@theme` 不能嵌套在选择器或媒体查询内。

### 步骤2：将 vben 颜色变量映射到 v4 命名空间
- 读取 Preferences 动态生成的主色/语义色变量（`--primary`, `--success`, `--warning`, `--destructive`），通过颜色生成器输出 `--{name}-{50..700}`，并同步设置 `--color-{name}-{50..700}` 与必要的语义别名（如 `--color-success-500`）。
- 关键点：Tailwind v4 会将主题变量编译为 CSS 变量，工具类会引用这些变量；因此运行时更新这些 CSS 变量值能实时影响已存在的工具类样式。

示例：（在运行时更新）
```ts
// 在 update-css-variables.ts 的颜色生成后追加：
document.documentElement.style.setProperty('--color-primary-500', colorVariables['--primary-500']);
document.documentElement.style.setProperty('--color-success-500', colorVariables['--green-500']);
document.documentElement.style.setProperty('--color-warning-500', colorVariables['--yellow-500']);
// 如需完整阶梯，循环同步 50..700 映射至 --color-*
```

### 步骤3：断点与变体迁移
- v4 将响应式断点由 `--breakpoint-*` 命名空间驱动。例如：
```css
@theme {
  --breakpoint-sm: 40rem; /* 默认 或重定义 */
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
}
```
- HTML 中仍使用 `sm:*`, `md:*` 变体工具类，无需更改；若重定义值会改变触发阈值。

### 步骤4：圆角、阴影、动画迁移
- 圆角：将 `--radius`（vben）与 v4 的 `--radius-*` 对齐，保留 Tailwind 工具类如 `rounded-lg` 自动映射。
- 阴影：声明 `--shadow-*`，继续使用 `shadow-sm`, `shadow-md` 等工具类。
- 动画：采用 `--animate-*` 并在 `@theme` 内声明 `@keyframes`，示例：
```css
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;
  @keyframes fade-in-scale {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
}
```

### 步骤5：暗色模式与内置主题切换
- 保留 Vben 的暗色切换逻辑（在 `document.documentElement` 切换 `classList.toggle('dark')` 与 `dataset.theme`）；
- v4 工具类仍可基于 `dark` 选择器工作（如 `dark:bg-neutral-900`）。同时 default/dark 的设计令牌分别在 `default.css` 与 `dark.css` 顶层 `@theme` 或普通 `:root` 中分组声明。
- 重要：若希望运行时调整生效，请避免在需要动态的变量上使用 `@theme inline`，否则工具类会内联具体值而非引用变量，阻断运行时更新的可见性。

### 步骤6：渐进替换内部 Tailwind 配置
- 现有 `@vben/tailwind-config`（`internal/tailwind-config/src/index.ts`）将颜色、半径等扩展注入到 Tailwind 主题；迁移到 v4 时：
  - 将大部分“主题值”改为 CSS 顶层 `@theme` 声明；
  - 仅保留必要的插件、safelist、内容扫描（`content`）与特定扩展（如 `@iconify/tailwind`）；
  - 将 `darkMode: 'selector'` 的行为继续保留（v4 支持），并确保 `html.dark` 切换逻辑不变。

### 步骤7：共享主题包/多应用复用
- 将 `@theme` 顶层主题变量抽取到可共享的 CSS 包（例如 `packages/brand/theme.css`），在多个应用入口通过 `@import "../brand/theme.css";` 复用。
- 针对各应用的差异，在自身入口追加或覆盖命名空间变量。

### 步骤8：清理与回归
- 移除不再需要的 JS 主题配置项（颜色表、半径数值），避免重复来源；
- 保留 BEM/SCSS 组织方式及现有 `@apply` 的组件层；
- 对关键页面与组件做回归测试（详见第7节）。

---

## 4. 需要保留的核心功能清单

- Preferences 偏好设置能力：
  - 主题模式（dark/light/auto）切换
  - 内置主题 `builtinType`（default/violet/.../custom）
  - 主色、成功、警告、错误色的自定义（`colorPrimary` 等）
  - 圆角 `radius` 动态更新
- 动态 CSS 变量注入（`update-css-variables.ts`）：
  - 在运行时更新 `document.documentElement` 上的 CSS 变量
  - 维护 `data-theme` 与 `class="dark"` 状态
- 颜色生成器（`generatorColorVariables`）：
  - 从单一 HSL/HEX 生成统一色阶（50..700）
- SCSS/BEM 命名与结构化样式组织：
  - `@use '@vben-core/design/bem' as *;` 与 `useNamespace`
- Tailwind 工具类与组件层：
  - `@apply` 用法、快速布局、响应式变体、状态变体
- 插件与内容扫描：
  - 图标、动画、typography、safelist/dark

---

## 5. 迁移关键注意点

- `@theme` 顶层规则：必须位于 CSS 顶层，不能嵌套在选择器或媒体查询内。
- 命名空间对齐：将 vben 的语义变量映射到 v4 规范命名空间（`--color-*`, `--radius-*` 等），否则不会生成对应工具类。
- 运行时更新与 inline：
  - 如需运行时更新变量生效，避免在这些变量上使用 `@theme inline`（inline 会让工具类内联值，导致后续变量变化不影响已生成的工具类）。
  - 默认编译会让工具类引用 CSS 变量，运行时更新可见。
- `initial` 清空策略：
  - 使用 `--color-*: initial` 会移除默认颜色工具类（如 `bg-red-500`），务必提供完整替代色板以避免类名失效。
- 动画 keyframes：
  - 若希望仅在定义了 `--animate-*` 时生成动画，请在 `@theme` 内定义 `@keyframes`。若希望始终存在，改在 `@theme` 外定义。
- 断点变体：
  - 通过 `--breakpoint-*` 重定义断点后，原有 `sm:*`, `md:*` 仍可用，只是触发阈值改变。
- 组件 `@apply` 与 CSS 变量：
  - 继续在组件层 `@layer components` 中用 `@apply` 组合工具类，同时可使用 `var(--...)` 引用设计令牌。

---

## 6. 新旧系统差异对比

| 维度 | 旧：Vben主题系统（v3风格） | 新：Tailwind v4 @theme体系 |
|---|---|---|
| 设计令牌声明 | 多来源：CSS变量文件 + JS Tailwind config | 统一在 CSS 顶层 `@theme` 声明 |
| 工具类/变体生成 | 由 JS 配置+默认主题驱动 | 由 `@theme` 命名空间变量驱动自动生成 |
| 动态更新 | 运行时更新 CSS 变量生效（多数引用变量） | 同样生效；但使用 `inline` 会使工具类变为静态值 |
| 默认主题 | Tailwind 默认 + 项目扩展 | 通过 `@import "tailwindcss"` 自动包含默认主题变量 |
| 清空与替换 | 通过 JS config 覆盖 | 使用 `--namespace-*: initial` 清空并重建 |
| 断点定义 | JS config `theme.screens` | `--breakpoint-*` 变量驱动 |
| 共享与复用 | 共享JS配置包 | 共享CSS主题包（`@theme`）更直观、可视化 |
| 学习/维护成本 | JS + CSS 混合心智负担 | CSS 层可视化令牌声明，降低跨层心智负担 |

---

## 7. 迁移后的验证方法

- 构建产物检查：
  - 编译后的 CSS 中存在 `:root { --color-...; --radius-...; }` 等变量；
  - 工具类可用性：`bg-primary-500`, `rounded-lg`, `sm:*` 等类名在页面上有预期效果。
- 主题切换验证：
  - 切换 Preferences.theme.mode（dark/light/auto），确认 `html.dark` 与 `data-theme` 切换，背景/前景/卡片/弹层等颜色正确更新。
- 自定义颜色验证：
  - 更新 `colorPrimary/colorSuccess/colorWarning/colorDestructive`，确认对应工具类（bg/text）与组件样式（`@apply`）随即响应。
- 圆角与阴影验证：
  - 修改 `radius`，检查 `rounded-*` 工具类映射是否与设计一致；阴影工具类生效且与变量绑定。
- 动画与断点验证：
  - 自定义 `--animate-*` 与 `@keyframes` 是否正确生成并生效；修改 `--breakpoint-*` 后响应式断点是否按新阈值切换。
- 回归测试：
  - 覆盖典型页面（登录、仪表盘、表格、表单）和关键组件（Layout、Menu、Tabs、Modal、Drawer、Button、Input），执行视觉与交互核对。

---

## 8. 附：示例参考片段

### 8.1 主题入口（含默认+企业扩展）
```css
@import "tailwindcss";

@theme {
  /* 清空默认颜色并自定义（可选） */
  /* --color-*: initial; */

  /* 企业主色 */
  --color-primary-50:  oklch(0.98 0.02 260);
  --color-primary-500: oklch(0.72 0.12 260);
  --color-primary-700: oklch(0.58 0.14 260);

  /* 中性色/背景/前景（示例） */
  --color-neutral-50:  oklch(0.98 0 0);
  --color-neutral-900: oklch(0.38 0 0);

  /* 圆角映射 */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);

  /* 断点重定义（如需） */
  --breakpoint-sm: 30rem;
  --breakpoint-md: 48rem;
}

/* 组件层 */
@layer components {
  .btn-primary {
    @apply bg-primary-500 text-white hover:bg-primary-700 rounded-lg px-4 py-2;
  }
}
```

### 8.2 运行时更新（保持与 Preferences 协作）
```ts
// 偏好更新后，动态同步色阶至 v4 命名空间
import { generatorColorVariables } from '@vben-core/shared/color';

function syncToV4Namespaces(preferences) {
  const { colorPrimary, colorSuccess, colorWarning, colorDestructive } = preferences.theme;
  const colorVars = generatorColorVariables([
    { color: colorPrimary, name: 'primary' },
    { alias: 'success', color: colorSuccess, name: 'green' },
    { alias: 'warning', color: colorWarning, name: 'yellow' },
    { alias: 'destructive', color: colorDestructive, name: 'red' },
  ]);

  // 同步关键档位到 --color-*
  const root = document.documentElement;
  ['50','100','200','300','400','500','600','700'].forEach((level) => {
    root.style.setProperty(`--color-primary-${level}`, colorVars[`--primary-${level}`] || '');
    root.style.setProperty(`--color-success-${level}`, colorVars[`--green-${level}`] || '');
    root.style.setProperty(`--color-warning-${level}`, colorVars[`--yellow-${level}`] || '');
    root.style.setProperty(`--color-red-${level}`,     colorVars[`--red-${level}`] || '');
  });

  // 保持 vben 语义别名（需要的话）
  root.style.setProperty(`--primary`,  colorVars['--primary-500']);
  root.style.setProperty(`--success`,  colorVars['--green-500']);
  root.style.setProperty(`--warning`,  colorVars['--yellow-500']);
  root.style.setProperty(`--destructive`, colorVars['--red-500']);
}
```

---

## 总结

通过将设计令牌迁移到 Tailwind v4 的 `@theme` 顶层命名空间声明，项目可获得“设计令牌 → 工具类/变体”自动映射、跨项目CSS主题包复用、更直观的主题管理方式。同时保留 Vben 的动态偏好设置与 CSS 变量注入，可实现运行时主题更新的即时生效。迁移过程中需严格遵守 `@theme` 顶层规则与命名空间约束，慎用 `inline` 于需动态的变量，使用 `initial` 清空命名空间时保证替代完整，最后通过系统化验证确保功能、视觉与交互一致。
