import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '流光·拾遗 - 中国古代历史专题网站',
  description: '探寻华夏历史，贯通古今议题。以 Next.js + Tailwind 构建的古风网站首页与后续拓展基础。',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Material Icons 字体，用于简洁渲染图标 */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {/* 字体（与 code.html 一致）：Ma Shan Zheng & Noto Serif SC */}
        <link
          href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground font-body">{children}</body>
    </html>
  )
}
