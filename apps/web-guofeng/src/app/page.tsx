import { SiteHeader } from '../components/layout/site-header'
import { SiteFooter } from '../components/layout/site-footer'
import { Hero } from '../components/home/hero'
import { CategoryGrid } from '../components/home/category-grid'
import { ArticlesAndTrends, CtaJoin, FeaturedTopics, SelectedFigures } from '../components/home/featured'

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SiteHeader />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedTopics />
        <SelectedFigures />
        <ArticlesAndTrends />
        <CtaJoin />
        <SubscribeFallback />
      </main>
      <SiteFooter />
    </div>
  )
}

// 订阅模块简化版（与 code.html 对齐），如需更复杂交互可替换
function SubscribeFallback() {
  return (
    <section className="mb-20 text-center">
      <div className="relative max-w-lg mx-auto">
        <input
          type="email"
          placeholder="输入您的邮箱订阅"
          className="w-full py-3 px-4 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 text-white rounded-full px-6 py-2 text-sm">
          订阅
        </button>
      </div>
    </section>
  )
}
