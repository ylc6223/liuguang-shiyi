import React from 'react'
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@packages/ui'

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <h1 className="text-2xl font-bold">UI 演示（Umi）</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">表单</h2>
        <div className="flex items-center gap-3">
          <Input placeholder="输入内容" className="w-64" />
          <Button variant={ButtonVariant.Default} size={ButtonSize.Default}>
            提交
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Dialog</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={ButtonVariant.Outline}>打开弹窗</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>标题</DialogTitle>
              <DialogDescription>这里是说明文案。</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>关闭</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>打开菜单</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>操作一</DropdownMenuItem>
            <DropdownMenuItem>操作二</DropdownMenuItem>
            <DropdownMenuItem>操作三</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tabs</h2>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">标签A</TabsTrigger>
            <TabsTrigger value="b">标签B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">内容 A</TabsContent>
          <TabsContent value="b">内容 B</TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

