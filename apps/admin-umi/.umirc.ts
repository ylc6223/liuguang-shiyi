import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'pnpm',
  // Switch Umi builder to Vite so ESM configs (e.g., PostCSS) are supported out of the box
  vite: {}
});
