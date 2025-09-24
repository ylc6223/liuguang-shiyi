import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@packages/ui'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}

export default nextConfig
