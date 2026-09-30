import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { reveal } from './directives/reveal'
import './styles/base.css'

// https://github.com/antfu-collective/vite-ssg
// 导出 createApp 供 vite-ssg 在构建时对每个路由做预渲染（SSG），
// 生成带真实内容的静态 HTML，让百度等不执行 JS 的爬虫也能抓取。
export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
    base: import.meta.env.BASE_URL,
  },
  ({ app }) => {
    app.directive('reveal', reveal)
  },
)
