# apps/web-guofeng 首页信息架构与交互设计（落地版）

本说明记录首页板块编排、交互与视觉要点，作为后续迭代与评审的依据。

## 目标与原则
- 首屏传达价值与路径清晰：价值主张（Hero）+ 快速探索（分类宫格 / 专题导览）。
- 先主题再脉络：精选与专题靠前，时间线承上启下，降低学习成本。
- 固定项均使用枚举与常量映射，避免散落硬编码，便于扩展。

## 板块顺序（当前采用）
顺序配置位置：`apps/web-guofeng/src/constants/home.ts` 的 `homeSectionOrder`（数字枚举 `HomeSection`）。

- Hero（价值主张 + 搜索 + CTA）
- 分类宫格（按主题探索的快速入口）
- 主打专题（卡片 3 列）
- 编辑精选（带配图卡片 3 列，Hover 轻缩放）
- 历史长河（中线 + 6 节点 + 按钮）
- 人物精选（列表卡片）
- 最新文章 / 本周热门（信息流）
- CTA（加入我们）
- 订阅（邮箱订阅）

> 如需重排，仅需调整 `homeSectionOrder` 中的顺序，无需改动页面实现。

## 关键交互与还原细节
- Hero CTA：
  - 文案：`专题导览`
  - 行为：跳转到 `/topics` 专题总览页，避免与紧随其后的分类宫格重复。
  - 视觉：描边主色 + Hover 填充（与设计稿一致）。
- 分类宫格：
  - 放置在 Hero 下，承担“快速探索”职责；容器 `id="categories"`，供锚点使用。
- 编辑精选：
  - 左上标题与旁白；三列卡片，含图片、标题、简介与“查看专题”描边按钮；图片 Hover 轻缩放。
  - 资源来源与常量：`apps/web-guofeng/src/constants/sections.ts` 中 `homeEditorsPicks*`。
- 历史长河：
  - 中心竖线（absolute left-1/2）+ 六个节点（夏、商、周、秦、汉、晋）。
  - 节点圆点采用金色强调（accent-gold）；标题与时间说明置中。
  - 底部按钮“查看完整时间轴”：描边金色 + Hover 填充，跳转 `/timeline`。
- 订阅按钮：
  - 使用金色强调色 `bg-accent` + 白字；保持与设计稿一致。

## 视觉与色板（与 `assets/code.html` 对齐）
- 主色（Primary）：`#C0392B`
- 背景（浅）：`#FDFBF8`；文字（浅）：`#333333`；边框（浅）：`#EAEAEA`
- 背景（深）：`#1A1A1A`；文字（深）：`#E5E5E5`；边框（深）：`#333333`
- 强调金色（Accent Gold）：`#C6A477`
- 字体：标题 `Ma Shan Zheng`；正文字体 `Noto Serif SC`
- 变量来源：`apps/web-guofeng/src/app/globals.css`（Tailwind v4 设计令牌映射）

## 实现要点（代码位置）
- 入口与顺序：`apps/web-guofeng/src/app/page.tsx`、`apps/web-guofeng/src/constants/home.ts`
- 组件：
  - 头部/底部：`src/components/layout/site-header.tsx`、`site-footer.tsx`
  - Hero：`src/components/home/hero.tsx`
  - 分类宫格：`src/components/home/category-grid.tsx`
  - 主打专题/人物精选/订阅/文章热门/CTA：`src/components/home/featured.tsx`
  - 编辑精选：`src/components/home/editors-picks.tsx`
  - 历史长河：`src/components/home/history-river.tsx`
- 常量与枚举：
  - 导航/热门/分类：`src/constants/navigation.ts`
  - 板块/顺序：`src/constants/home.ts`
  - 历史长河与精选：`src/constants/sections.ts`

## 后续迭代建议
- `/topics` 专题页：增加分组/筛选/搜索骨架，形成“系统导览”。
- 历史长河：可扩展节点数据与二级时间线页（`/timeline/:era`）。
- 分类宫格（移动端）：默认仅展示 1 行，按钮“展开全部分类”。
- 动效：IntersectionObserver 懒加载宫格与精选，提升首屏观感与性能。
