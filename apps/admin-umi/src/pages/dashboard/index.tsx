import React from 'react'
import {
  Card,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Button,
  ButtonVariant,
} from '@packages/ui'
import {
  ActivityIcon,
  UsersIcon,
  ShoppingCartIcon,
  DollarSignIcon,
} from 'lucide-react'

// 固定度量类型：使用枚举绑定数字常量，避免裸字符串/数字
enum MetricType {
  Visits = 1,
  Users = 2,
  Orders = 3,
  Revenue = 4,
}

// 图表时间范围 Tabs
enum RangeTab {
  Week = 1,
  Month = 2,
  Quarter = 3,
}

type MetricItem = {
  type: MetricType
  label: string
  value: string
  delta?: string
  icon: React.ReactNode
}

const metrics: MetricItem[] = [
  {
    type: MetricType.Visits,
    label: '今日访问',
    value: '12,340',
    delta: '+8.2%',
    icon: <ActivityIcon className="size-4 text-muted-foreground" />,
  },
  {
    type: MetricType.Users,
    label: '新增用户',
    value: '268',
    delta: '+3.1%',
    icon: <UsersIcon className="size-4 text-muted-foreground" />,
  },
  {
    type: MetricType.Orders,
    label: '新增订单',
    value: '1,042',
    delta: '+1.7%',
    icon: <ShoppingCartIcon className="size-4 text-muted-foreground" />,
  },
  {
    type: MetricType.Revenue,
    label: '今日营收',
    value: '¥ 84,320',
    delta: '+5.4%',
    icon: <DollarSignIcon className="size-4 text-muted-foreground" />,
  },
]

export default function DashboardHome() {
  return (
    <div className="grid gap-6">
      {/* 统计卡片 */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.type} className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{m.label}</div>
              {m.icon}
            </div>
            <div className="pt-2 text-3xl font-semibold">{m.value}</div>
            {m.delta ? (
              <div className="pt-2 text-xs text-muted-foreground">较昨日 {m.delta}</div>
            ) : null}
          </Card>
        ))}
      </section>

      {/* 折线图/柱状图占位 + 目标进度 */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">营收趋势</div>
              <div className="text-base font-semibold">Revenue Trend</div>
            </div>
            <Tabs defaultValue={String(RangeTab.Week)}>
              <TabsList>
                <TabsTrigger value={String(RangeTab.Week)}>本周</TabsTrigger>
                <TabsTrigger value={String(RangeTab.Month)}>本月</TabsTrigger>
                <TabsTrigger value={String(RangeTab.Quarter)}>季度</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Separator className="my-4" />
          {/* 图表占位：保持 Tailwind 默认主题，后续可接入实际图表库 */}
          <div className="grid h-60 place-items-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
            图表占位（接入 ECharts/Recharts/Chart.js）
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">目标完成度</div>
          <div className="pt-2 text-base font-semibold">Q3 目标进度</div>
          <div className="pt-4 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>营收</span>
                <Badge>72%</Badge>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>订单</span>
                <Badge>58%</Badge>
              </div>
              <Progress value={58} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>新客</span>
                <Badge>41%</Badge>
              </div>
              <Progress value={41} />
            </div>
          </div>
        </Card>
      </section>

      {/* 最近订单 */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-0 lg:col-span-2">
          <div className="flex items-center justify-between p-4">
            <div>
              <div className="text-sm text-muted-foreground">最近订单</div>
              <div className="text-base font-semibold">Recent Orders</div>
            </div>
            <Button variant={ButtonVariant.Outline} size="sm">查看全部</Button>
          </div>
          <Separator />
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  <TableHead>用户</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead className="text-right">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#202509-001</TableCell>
                  <TableCell>Li Hua</TableCell>
                  <TableCell>¥ 1,280</TableCell>
                  <TableCell className="text-right"><Badge>已支付</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#202509-002</TableCell>
                  <TableCell>Zhang Wei</TableCell>
                  <TableCell>¥ 560</TableCell>
                  <TableCell className="text-right"><Badge>待发货</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#202509-003</TableCell>
                  <TableCell>Wang Fang</TableCell>
                  <TableCell>¥ 2,310</TableCell>
                  <TableCell className="text-right"><Badge>退款中</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">快捷操作</div>
          <div className="pt-3 grid gap-2">
            <Button>创建订单</Button>
            <Button variant={ButtonVariant.Outline}>导出报表</Button>
            <Button variant={ButtonVariant.Outline}>邀请成员</Button>
          </div>
        </Card>
      </section>
    </div>
  )
}
