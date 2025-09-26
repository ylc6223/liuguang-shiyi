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
  // 调整：宫格放在 Hero 下方；历史长河放在 编辑精选 下方
  HomeSection.Hero,
  HomeSection.CategoryGrid,
  HomeSection.FeaturedTopics,
  HomeSection.EditorsPicks,
  HomeSection.HistoryRiver,
  HomeSection.SelectedFigures,
  HomeSection.ArticlesAndTrends,
  HomeSection.CtaJoin,
  HomeSection.Subscribe,
]
