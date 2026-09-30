# 林川 · 全栈开发者 — 个人信息网站

基于 **Vite + Vue 3 + TypeScript + Vue Router** 的个人主页，由 HTML UI 原型重构为可上线的组件化工程。

## 技术栈

- **Vue 3**（`<script setup>` + Composition API）
- **TypeScript**（strict 模式，`vue-tsc` 类型检查）
- **Vue Router 4**（history 模式 + 区块锚点平滑滚动 + 详情子路由）
- **Vite 6**
- 无 UI 框架，纯手写 CSS（沿用原型的黑白灰设计系统，CSS 变量 + scoped 样式）

## 快速开始

```bash
npm install
npm run dev        # 本地开发（默认 http://localhost:5173）
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 本地预览生产构建
npm run type-check # 仅类型检查
```

要求 Node.js >= 18。

## 目录结构

```
src/
├── main.ts                # 入口：挂载应用 + 注册路由 + 全局指令
├── App.vue                # 应用外壳（导航 / 路由出口 / 页脚 / Toast）
├── router/index.ts        # 路由 + 平滑滚动行为
├── data/site.ts           # ★ 全站内容集中在此（文案/图片/链接）
├── types/index.ts         # 数据模型类型
├── styles/base.css        # 设计令牌 / 重置 / 共享工具类
├── directives/reveal.ts   # v-reveal 滚动揭示指令
├── composables/useToast.ts# 全局 Toast 单例
├── components/
│   ├── SiteNav.vue        # 固定导航（含移动端汉堡菜单）
│   ├── SiteFooter.vue
│   ├── AppToast.vue
│   ├── SectionHead.vue    # 区块标题（编号 / 标题 / 说明）
│   └── sections/          # 七个区块组件
│       ├── HeroSection.vue
│       ├── AboutSection.vue
│       ├── SkillsSection.vue
│       ├── ProjectsSection.vue
│       ├── ExperienceSection.vue
│       ├── BlogSection.vue
│       └── ContactSection.vue
└── views/
    ├── HomeView.vue           # 单页长滚动（聚合所有区块）
    ├── ProjectDetailView.vue  # /projects/:slug
    ├── BlogDetailView.vue     # /blog/:slug
    └── NotFoundView.vue       # 404
```

## 路由设计

采用「单页长滚动 + 锚点路由」：

| 路径 | 说明 |
| --- | --- |
| `/` | 首页（所有区块在一页，`#about`、`#skills`… 锚点平滑滚动） |
| `/projects/:slug` | 项目详情 |
| `/blog/:slug` | 博客详情 |
| `*` | 404 |

导航链接通过 `<RouterLink :to="{ path: '/', hash: '#about' }">` 实现——从详情页点击导航会先回到首页再滚动到对应区块。滚动补偿固定导航高度（`scroll-margin-top: 64px`）。

## 上线前替换内容

所有占位文案、图片、链接集中在 **`src/data/site.ts`**，替换这一个文件即可：

- `site.name` / `site.nameEn` / `hero.*` — 姓名、简介、数据指标
- `about.*` — 头像图片、个人介绍、事实栏
- `projects.items` / `projects.more.href` — 项目与 GitHub 链接
- `experience.items` — 工作经历时间线
- `blog.posts` — 文章列表与正文
- `contact.email` / `contact.socials[].href` — 邮箱与社交链接（留空时点击会弹出 Toast 占位）
- `footer.*` — 版权信息

`index.html` 中的 `<title>`、`<meta>`（含 Open Graph）也需按真实信息更新，并替换 `og:image` 为真实缩略图。

## 部署

三种方式都已配好（均为 history 路由 SPA，已处理深链刷新回退）：

### Vercel

```bash
npm i -g vercel && vercel
```

或导入 GitHub 仓库，构建命令/输出目录已写在 `vercel.json`（`rewrites` 负责 SPA 回退）。

### Netlify

导入 GitHub 仓库即可，`netlify.toml` 已配置构建命令、输出目录与 SPA redirect。

### GitHub Pages

1. 推送到 GitHub 的 `main` 分支；
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**；
3. 每次 push 会通过 `.github/workflows/deploy.yml` 自动构建部署。

> 项目页（`username.github.io/<repo>/`）会自动以仓库名为 `base`；若部署到用户/组织主页（`username.github.io`），请删除 workflow 中的 `BASE_PATH` 环境变量。

### 自定义静态服务器

`dist/` 为纯静态产物，任意静态托管均可。history 路由需将所有路径回退到 `index.html`（Nginx 用 `try_files $uri /index.html;`）。

## 可选优化（未包含，可按需添加）

- ESLint + Prettier（代码风格与格式化）
- Pinia（当前内容为静态数据，尚无跨组件状态需求）
- SEO：`vite-plugin-html` / `unhead` 动态管理每页 `<title>` 与 meta
- 分析：接入 Vercel Analytics / GA4
- 图片：本地化占位图 + `loading="lazy"` + 响应式 `<picture>`
