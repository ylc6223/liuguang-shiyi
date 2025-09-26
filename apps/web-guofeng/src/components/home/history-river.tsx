import Link from 'next/link'
import { riverEras, riverErasOrder, RiverEraKey } from '../../constants/sections'

export function HistoryRiver() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-display text-center">历史长河</h3>
      <p className="mt-2 mb-8 text-sm text-muted-foreground text-center">
        穿越时空，探寻中国古代的辉煌与变迁
      </p>
      <div className="relative">
        {/* 中线 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {riverErasOrder.map((k: RiverEraKey) => (
            <Link key={k} href={riverEras[k].href} className="text-center relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-accent border-2 border-white dark:border-gray-800" />
              <h4 className="font-semibold text-lg">{riverEras[k].label}</h4>
              <p className="text-sm text-muted-foreground">{riverEras[k].period}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <Link
          href="/timeline"
          className="inline-block text-accent border border-accent rounded-full px-6 py-2 text-sm hover:bg-accent hover:text-white transition-colors"
        >
          查看完整时间轴
        </Link>
      </div>
    </section>
  )
}
