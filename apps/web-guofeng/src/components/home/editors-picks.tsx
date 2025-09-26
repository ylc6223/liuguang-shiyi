import Link from 'next/link'
import {
  homeEditorsPicks,
  homeEditorsPicksOrder,
  HomeEditorsPickKey,
} from '../../constants/sections'

export function EditorsPicks() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-display text-center">编辑精选</h3>
      <p className="mt-2 mb-8 text-sm text-muted-foreground text-center">
        回望千年历史，品味古今文化精髓
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {homeEditorsPicksOrder.map((k: HomeEditorsPickKey) => (
          <div
            key={k}
            className="bg-card rounded-lg border border-border p-6 group overflow-hidden"
          >
            <img
              src={homeEditorsPicks[k].image}
              alt={homeEditorsPicks[k].imageAlt}
              className="w-full h-48 object-cover rounded-md mb-4 transform group-hover:scale-105 transition-transform duration-300"
            />
            <h4 className="text-xl font-semibold mb-2">{homeEditorsPicks[k].title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{homeEditorsPicks[k].desc}</p>
            <Link
              className="inline-block text-primary border border-primary rounded-full px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              href={homeEditorsPicks[k].href}
            >
              查看专题
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
