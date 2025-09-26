// Shared Tailwind preset (v4). Keep minimal; apps can extend.
import { enterAnimationPlugin } from './plugins/entry.js'

/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {},
  },
  // 仅启用轻量自定义插件；其余插件（如 tailwindcss-animate）建议用 CSS @plugin 按需引入
  plugins: [enterAnimationPlugin],
}

export default preset
