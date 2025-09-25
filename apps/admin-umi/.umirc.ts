import { defineConfig } from '@umijs/max'

export default defineConfig({
  npmClient: 'pnpm',
  vite: {},
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: './login' },
    {
      path: '/dashboard',
      component: '../layouts/dashboard-layout',
      routes: [
        { index: true, component: './dashboard/index' },
      ],
    },
  ],
})
