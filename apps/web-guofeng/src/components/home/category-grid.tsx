import Link from 'next/link'
import { categories, CategoryKey } from '../../constants/navigation'
import { MaterialIcon } from '../common/material-icon'

export function CategoryGrid() {
  const order: CategoryKey[] = [
    CategoryKey.Origin,
    CategoryKey.Law,
    CategoryKey.Culture,
    CategoryKey.Technology,
    CategoryKey.Poetry,
    CategoryKey.Geography,
  ]
  return (
    <section className="mb-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {order.map((key) => (
          <Link
            key={key}
            href={categories[key].href}
            className="flex flex-col items-center gap-2 text-center group"
          >
            <div className="p-4 bg-card rounded-lg border border-border group-hover:border-primary transition-all duration-300 transform group-hover:-translate-y-1">
              <MaterialIcon name={categories[key].icon} className="text-4xl text-primary" />
            </div>
            <span className="text-sm font-semibold group-hover:text-primary transition-colors">
              {categories[key].label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

