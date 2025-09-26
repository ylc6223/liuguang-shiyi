import Link from 'next/link'

export function FeaturedTopics() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-display text-center">主打专题</h3>
      <p className="mt-2 mb-8 text-sm text-muted-foreground text-center">
        探索中华历史的智慧与遗产
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: '大唐盛世', desc: '开放与包容的黄金时代', href: '/topics/tang-golden-age' },
          { title: '宋学与雅致', desc: '美学与秩序的结合', href: '/topics/song-aesthetics' },
          { title: '明匠与器物', desc: '工艺中的哲学与细节', href: '/topics/ming-craft' },
        ].map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="block p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
          >
            <p className="font-semibold mb-1">{t.title}</p>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function SelectedFigures() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-display text-center">人物精选</h3>
      <p className="mt-2 mb-8 text-sm text-muted-foreground text-center">
        从史实到风云人物，解读中华文明的起承转合
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: '孔子', desc: '儒家学派创始人，思想深远影响。', href: '/figures/confucius' },
          { name: '李白', desc: '盛唐诗人，浪漫主义巅峰。', href: '/figures/li-bai' },
          { name: '王阳明', desc: '心学大家，知行合一。', href: '/figures/wang-yangming' },
        ].map((p) => (
          <div key={p.name} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
            <div className="size-12 rounded-full bg-muted" />
            <div>
              <h4 className="text-lg font-semibold">{p.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{p.desc}</p>
              <Link className="text-sm text-primary hover:underline" href={p.href}>
                查看详情
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ArticlesAndTrends() {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-display text-left mb-4">最新文章</h3>
          <div className="space-y-4">
            {[
              { t: '史记中的人物列传艺术', d: '2024年05月20日', h: '/articles/shiji-arts' },
              { t: '大唐盛世的开放与包容', d: '2024年05月18日', h: '/articles/tang-openness' },
            ].map((a) => (
              <Link
                key={a.t}
                className="block p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                href={a.h}
              >
                <p className="font-semibold">{a.t}</p>
                <p className="text-sm text-muted-foreground">发布日期: {a.d}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-display text-left mb-4">本周热门</h3>
          <div className="space-y-4">
            {[
              { t: '宋朝美学：极简与雅致', d: '阅读数: 1.2w', h: '/hot/song-aesthetic' },
              { t: '明代家具的设计哲学', d: '阅读数: 9.8k', h: '/hot/ming-furniture' },
            ].map((a) => (
              <Link
                key={a.t}
                className="block p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                href={a.h}
              >
                <p className="font-semibold">{a.t}</p>
                <p className="text-sm text-muted-foreground">{a.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CtaJoin() {
  return (
    <section className="mb-20 bg-card rounded-lg border border-border p-10 text-center">
      <h3 className="text-3xl font-display mb-2">加入我们</h3>
      <p className="text-muted-foreground mb-6">成为内容共建者，分享您对历史的见解与热情。</p>
      <div className="flex justify-center gap-4">
        <Link className="bg-primary text-primary-foreground rounded-full px-8 py-3" href="/join">
          成为作者
        </Link>
        <Link
          className="bg-secondary text-secondary-foreground rounded-full px-8 py-3 hover:opacity-90"
          href="/about"
        >
          了解详情
        </Link>
      </div>
    </section>
  )
}

export function Subscribe() {
  return (
    <section className="mb-20 text-center">
      <div className="relative max-w-lg mx-auto">
        <input
          type="email"
          placeholder="输入您的邮箱订阅"
          className="w-full py-3 px-4 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white rounded-full px-6 py-2 text-sm hover:opacity-90">
          订阅
        </button>
      </div>
    </section>
  )
}
