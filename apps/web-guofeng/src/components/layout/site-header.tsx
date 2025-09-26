import Link from 'next/link'
import { MaterialIcon } from '../common/material-icon'
import { mainNavOrder, navItems } from '../../constants/navigation'

export function SiteHeader() {
  return (
    <header className="py-6 flex justify-between items-center border-b border-border">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <MaterialIcon name="language" className="text-primary text-3xl" />
          <span className="text-2xl font-display">流光·拾遗</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm">
        {mainNavOrder.map((key) => (
          <Link
            key={key}
            href={navItems[key].href}
            className="hover:text-primary transition-colors"
          >
            {navItems[key].label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button className="hover:text-primary transition-colors" aria-label="个人中心">
          <MaterialIcon name="person_outline" />
        </button>
        <button className="hover:text-primary transition-colors" aria-label="设置">
          <MaterialIcon name="settings" />
        </button>
      </div>
    </header>
  )
}
