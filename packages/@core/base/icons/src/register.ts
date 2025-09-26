// 简单的集合/图标注册封装，便于在应用入口一次性注册
// 结合 Iconify 的集合格式使用
// 为保持对 @iconify/react 的最小依赖，按需导入内部工具
// 注意：此文件仅做占位与 API 约定，不强制要求必须调用

// @ts-ignore - 内部导出路径，Iconify 官方建议方式
import { addCollection, addIcon } from '@iconify/react/dist/iconify.js';

export function registerCollection(collection: unknown) {
  addCollection(collection as any);
}

export function registerIcon(name: string, data: unknown) {
  addIcon(name, data as any);
}

