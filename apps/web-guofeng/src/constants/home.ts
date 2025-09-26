// 首页板块枚举与顺序（可配置）
export enum HomeSection {
  Hero = 1,
  HistoryRiver = 2,
  CategoryGrid = 3,
  FeaturedTopics = 4,
  EditorsPicks = 5,
  SelectedFigures = 6,
  ArticlesAndTrends = 7,
  CtaJoin = 8,
  Subscribe = 9,
}

// 版式B（学习路径/时间线优先）
export const homeSectionOrder: HomeSection[] = [
  // 方案A（首屏不出现分类宫格）
  HomeSection.Hero,
  HomeSection.HistoryRiver,
  HomeSection.FeaturedTopics,
  HomeSection.EditorsPicks,
  HomeSection.SelectedFigures,
  HomeSection.CategoryGrid,
  HomeSection.ArticlesAndTrends,
  HomeSection.CtaJoin,
  HomeSection.Subscribe,
]
