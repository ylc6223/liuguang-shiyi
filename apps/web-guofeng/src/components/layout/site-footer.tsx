import Link from 'next/link'
import { MaterialIcon } from '../common/material-icon'

export function SiteFooter() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MaterialIcon name="language" className="text-primary text-2xl" />
              <span className="text-xl font-display">流光·拾遗</span>
            </Link>
            <p className="text-sm text-muted-foreground">© 2024 流光·拾遗. All Rights Reserved.</p>
            <p className="text-xs text-muted-foreground mt-2">内容仅供学习交流</p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">导航</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-primary" href="/">首页</Link></li>
              <li><Link className="hover:text-primary" href="/timeline">历史脉络</Link></li>
              <li><Link className="hover:text-primary" href="/figures">人物</Link></li>
              <li><Link className="hover:text-primary" href="/events">事件</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">专题</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-primary" href="/topics/silk-road">丝绸之路</Link></li>
              <li><Link className="hover:text-primary" href="/topics/grand-canal">大运河</Link></li>
              <li><Link className="hover:text-primary" href="/topics/four-inventions">四大发明</Link></li>
              <li><Link className="hover:text-primary" href="/topics/hundred-schools">诸子百家</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">社区</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-primary" href="/about">关于我们</Link></li>
              <li><Link className="hover:text-primary" href="/join">加入我们</Link></li>
              <li><Link className="hover:text-primary" href="/contact">联系方式</Link></li>
              <li><Link className="hover:text-primary" href="/privacy">隐私政策</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
