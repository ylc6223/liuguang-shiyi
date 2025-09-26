import { SiteHeader } from '../components/layout/site-header'
import { SiteFooter } from '../components/layout/site-footer'
import { Hero } from '../components/home/hero'
import { CategoryGrid } from '../components/home/category-grid'
import { HistoryRiver } from '../components/home/history-river'
import { ArticlesAndTrends, CtaJoin, FeaturedTopics, SelectedFigures, Subscribe } from '../components/home/featured'
import { EditorsPicks } from '../components/home/editors-picks'
import { HomeSection, homeSectionOrder } from '../constants/home'

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SiteHeader />
      <main>
        {homeSectionOrder.map((s) => (
          <Section key={s} section={s} />
        ))}
      </main>
      <SiteFooter />
    </div>
  )
}

function Section({ section }: { section: HomeSection }) {
  switch (section) {
    case HomeSection.Hero:
      return <Hero />
    case HomeSection.HistoryRiver:
      return <HistoryRiver />
    case HomeSection.CategoryGrid:
      return <CategoryGrid />
    case HomeSection.FeaturedTopics:
      return <FeaturedTopics />
    case HomeSection.EditorsPicks:
      return <EditorsPicks />
    case HomeSection.SelectedFigures:
      return <SelectedFigures />
    case HomeSection.ArticlesAndTrends:
      return <ArticlesAndTrends />
    case HomeSection.CtaJoin:
      return <CtaJoin />
    case HomeSection.Subscribe:
      return <Subscribe />
    default:
      return null
  }
}

// 订阅模块简化版（与 code.html 对齐），如需更复杂交互可替换
// 订阅模块使用 Featured 中的实现，已对齐设计稿配色（accent-gold）
