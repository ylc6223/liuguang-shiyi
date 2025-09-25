import React from 'react'
import { Outlet, history, Link } from '@umijs/max'
import {
  Button,
  ButtonVariant,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  Sheet,
  SheetTrigger,
  SheetContent,
} from '@packages/ui'
import { MenuIcon, LayoutDashboardIcon, BarChart3Icon, SettingsIcon } from 'lucide-react'

enum MenuKey {
  Overview = 1,
  Reports = 2,
  Settings = 3,
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <div className="text-base font-semibold">Admin Dashboard</div>
          <Separator className="h-6" orientation="vertical" />
          <Tabs defaultValue="1">
            <TabsList>
              <TabsTrigger value={String(MenuKey.Overview)}>总览</TabsTrigger>
              <TabsTrigger value={String(MenuKey.Reports)}>报表</TabsTrigger>
              <TabsTrigger value={String(MenuKey.Settings)}>设置</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={ButtonVariant.Outline} onClick={() => history.push('/login')}>
            退出登录
          </Button>
        </div>
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card p-4 md:block">
      <nav className="space-y-1 text-sm">
        <div className="px-3 pb-2 text-xs font-medium text-muted-foreground">导航</div>
        <Link className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent" to="/dashboard">
          <LayoutDashboardIcon className="size-4" /> 仪表盘
        </Link>
        <Link className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent" to="/dashboard">
          <BarChart3Icon className="size-4" /> 数据中心
        </Link>
        <Link className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent" to="/dashboard">
          <SettingsIcon className="size-4" /> 系统设置
        </Link>
      </nav>
    </aside>
  )
}

export default function DashboardLayout() {
  return (
    <div className="min-h-dvh w-full bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={ButtonVariant.Outline} className="md:hidden">
                  <MenuIcon className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className="text-base font-semibold">Admin Dashboard</div>
            <Separator className="h-6" orientation="vertical" />
            <Tabs defaultValue="1" className="hidden md:block">
              <TabsList>
                <TabsTrigger value={String(MenuKey.Overview)}>总览</TabsTrigger>
                <TabsTrigger value={String(MenuKey.Reports)}>报表</TabsTrigger>
                <TabsTrigger value={String(MenuKey.Settings)}>设置</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={ButtonVariant.Outline} onClick={() => { localStorage.removeItem('token'); history.push('/login') }}>
              退出登录
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 md:grid-cols-[16rem_1fr] md:gap-6">
        <Sidebar />
        <main className="min-h-[calc(100dvh-3.5rem)] py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
