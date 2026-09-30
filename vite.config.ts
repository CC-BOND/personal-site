import { fileURLToPath, URL } from 'node:url'
import { existsSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { site } from './src/data/site'

/**
 * GitHub Pages 用 history 路由时，刷新深链（如 /projects/xxx）会 404。
 * 约定：若构建产物根目录存在 404.html，GitHub Pages 会用它兜底回退到 SPA。
 * 这里在每次构建后把 index.html 复制一份为 404.html。
 */
function copyIndexTo404(): Plugin {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const indexPath = resolve(process.cwd(), 'dist', 'index.html')
      const notFoundPath = resolve(process.cwd(), 'dist', '404.html')
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, notFoundPath)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目页需以仓库名为 base；Vercel/Netlify 默认 '/' 即可。
  // 部署时通过环境变量 BASE_PATH 注入（见 .github/workflows/deploy.yml）。
  base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/',
  plugins: [vue(), copyIndexTo404()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 预渲染（vite-ssg）配置：静态化所有页面，让百度等不执行 JS 的爬虫也能抓取真实内容。
  ssgOptions: {
    includedRoutes: (paths) => {
      // 过滤掉动态路由占位（含 ':' 的路径）与 catch-all，只保留具体页面
      const concrete = paths.filter((p) => !p.includes(':'))
      for (const p of site.projects.items) concrete.push(`/projects/${p.slug}`)
      for (const b of site.blog.posts) concrete.push(`/blog/${b.slug}`)
      return concrete
    },
  },
})
