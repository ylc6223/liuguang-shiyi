import type { Config } from 'tailwindcss'
import preset from '@packages/tailwind-config'

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config

