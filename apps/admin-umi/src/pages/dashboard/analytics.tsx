import React from 'react'
import { Card, Tabs, TabsList, TabsTrigger, TabsContent, Separator, Badge, Progress } from '@packages/ui'

// 数字枚举，避免裸字符串/数字
enum ChartTab {
  Trends = 1,
  Visits = 2,
}

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6">
      {/* 概览四卡 */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: '用户量', total: '120,000', value: '2,000' },
          { title: '访问量', total: '500,000', value: '20,000' },
          { title: '下载量', total: '120,000', value: '8,000' },
          { title: '使用量', total: '50,000', value: '5,000' },
        ].map((it) => (
          <Card key={it.title} className="p-4">
            <div className="text-sm text-muted-foreground">{it.title}</div>
            <div className="pt-2 text-2xl font-semibold">{it.value}</div>
            <div className="pt-2 text-xs text-muted-foreground">累计 {it.total}</div>
          </Card>
        ))}
      </section>

      {/* 图表 Tabs */}
      <section className="grid gap-4">
        <Card className="p-4">
          <Tabs defaultValue={String(ChartTab.Trends)}>
            <TabsList>
              <TabsTrigger value={String(ChartTab.Trends)}>流量趋势</TabsTrigger>
              <TabsTrigger value={String(ChartTab.Visits)}>月访问量</TabsTrigger>
            </TabsList>
            <Separator className="my-4" />
            <TabsContent value={String(ChartTab.Trends)}>
              <div className="grid h-56 place-items-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
                趋势图占位（接入图表库）
              </div>
            </TabsContent>
            <TabsContent value={String(ChartTab.Visits)}>
              <div className="grid h-56 place-items-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
                访问量图占位（接入图表库）
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* 底部三列卡片 */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">访问数量</div>
            <Badge>当日</Badge>
          </div>
          <div className="mt-4">
            <Progress value={66} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">访问来源</div>
            <Badge>当周</Badge>
          </div>
          <div className="mt-4 grid h-36 place-items-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
            饼图占位
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">销售转化</div>
            <Badge>当月</Badge>
          </div>
          <div className="mt-4 grid h-36 place-items-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
            柱状图占位
          </div>
        </Card>
      </section>
    </div>
  )
}

