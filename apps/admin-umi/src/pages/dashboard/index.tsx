import React from 'react'
import { Card } from '@packages/ui'

export default function DashboardHome() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">今日访问</div>
        <div className="pt-2 text-3xl font-semibold">12,340</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">新增用户</div>
        <div className="pt-2 text-3xl font-semibold">268</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">转化率</div>
        <div className="pt-2 text-3xl font-semibold">3.1%</div>
      </Card>
      <Card className="p-4 md:col-span-2 lg:col-span-3">
        <div className="text-sm text-muted-foreground">近期动态</div>
        <div className="pt-3 text-sm">这里可放置图表或表格……</div>
      </Card>
    </div>
  )
}

