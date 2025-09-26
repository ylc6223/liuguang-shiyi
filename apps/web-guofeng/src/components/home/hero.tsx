import Link from 'next/link'
import { hotKeywords, HotKeyword } from '../../constants/navigation'
import { MaterialIcon } from '../common/material-icon'

export function Hero() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-5xl lg:text-7xl font-display mb-4">探寻华夏历史</h1>
      <h2 className="text-5xl lg:text-7xl font-display mb-6">贯通古今议题</h2>
      <p className="text-lg text-muted-foreground mb-10">
        Unraveling the Story of Chinese Civilization through Events and Figures
      </p>
      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="搜: 诗词歌赋、朝代、名士..."
            className="w-full py-3 px-4 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 transition-colors">
            <MaterialIcon name="search" />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span>热门:</span>
          {(
            [HotKeyword.Tang, HotKeyword.SongPoem, HotKeyword.LiBai, HotKeyword.ThreeKingdoms] as const
          ).map((k) => (
            <Link key={k} className="hover:text-primary" href={hotKeywords[k].href}>
              {hotKeywords[k].label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            href="#categories"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            按主题探索
            <MaterialIcon name="south" className="text-base" />
          </Link>
        </div>
      </div>
    </section>
  )
}
