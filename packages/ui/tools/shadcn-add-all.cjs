#!/usr/bin/env node
/**
 * Batch add common shadcn/ui components into this package.
 * Requires network access. Safe to re-run; existing files will be skipped/updated.
 */
const { spawnSync } = require('node:child_process')

// A reasonably complete set; adjust as needed
const components = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'collapsible',
  'command',
  'context-menu',
  'dialog',
  'drawer',
  'dropdown-menu',
  'form',
  'hover-card',
  'input',
  'label',
  'menubar',
  'navigation-menu',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'resizable',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'slider',
  'sonner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'tooltip'
]

for (const name of components) {
  console.log(`\n>>> Adding component: ${name}`)
  const r = spawnSync('pnpm', ['dlx', 'shadcn@latest', 'add', name, '-y'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (r.status !== 0) {
    console.warn(`Failed to add component: ${name}. You can re-run later.`)
  }
}

console.log('\nAll components processed.')

