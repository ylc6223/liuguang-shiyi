import React from 'react'
import { Card, Separator, Badge, Progress, Button, ButtonVariant } from '@packages/ui'

// 数字枚举，避免裸字符串/数字
enum ColumnSpan {
  Main = 1,
  Side = 2,
}

export default function WorkspacePage() {
  return (
    <div className="grid gap-6">
      {/* Header 问候卡 */}
      <Card className="p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-semibold">早安，编辑者</div>
            <div className="text-sm text-muted-foreground">开始你的一天创作吧～</div>
          </div>
          <div className="flex gap-2">
            <Button>新建内容</Button>
            <Button variant={ButtonVariant.Outline}>上传媒体</Button>
          </div>
        </div>
      </Card>

      {/* 主列 3/5 + 侧列 2/5 */}
      <section className="grid gap-4 lg:grid-cols-5">
        {/* 主列 */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">项目</div>
              <Button variant={ButtonVariant.Outline} size="sm">查看更多</Button>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3 sm:grid-cols-2">
              {['历史专题', '人物志', '朝代录', '图文集'].map((t) => (
                <Card key={t} className="p-4">
                  <div className="text-sm text-muted-foreground">{t}</div>
                  <div className="pt-2 text-xs text-muted-foreground">一句话描述占位</div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-base font-semibold">最新动态</div>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              {['创建了项目《大唐盛世》','发布了文章《秦制与汉承》','上传了媒体《山水图1》','修订了条目《李白》'].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="truncate">{s}</div>
                  <div className="text-xs text-muted-foreground">刚刚</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 侧列 */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">快捷导航</div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-2 sm:grid-cols-2">
              {['首页','仪表盘','系统管理','图表'].map((t) => (
                <Button key={t} variant={ButtonVariant.Outline}>{t}</Button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-base font-semibold">待办事项</div>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              {['审查最近提交','优化性能指标','安全巡检','更新依赖'].map((t, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="truncate">{t}</div>
                  <Badge>待处理</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">目标进度</div>
              <Badge>Q3</Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>专题产出</span><span>66%</span></div>
                <Progress value={66} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>人物条目</span><span>48%</span></div>
                <Progress value={48} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>媒体集</span><span>35%</span></div>
                <Progress value={35} />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

