import type {
  NavItem,
  Fact,
  SkillGroup,
  Project,
  ExperienceItem,
  BlogPost,
  SocialLink,
} from '@/types'

/**
 * 全站内容集中在此，替换文案/图片/链接时只需改这一个文件。
 */
export const site = {
  name: '朱张成',
  nameEn: 'GG BOND',
  logoMark: '朱',
  role: '自由创作者 · Free Creator',
  toastMessage: '链接待补充',

  nav: [
    { label: '关于', id: 'about' },
    { label: '技能', id: 'skills' },
    { label: '项目', id: 'projects' },
    { label: '经历', id: 'experience' },
    { label: '博客', id: 'blog' },
    { label: '联系', id: 'contact' },
  ] as NavItem[],

  hero: {
    eyebrow: 'Personal Website · 个人主页',
    nameEn: 'GG BOND · FREE CREATOR',
    description:
      '自由创作者，前端 / 小程序 / 后端开发与视频剪辑双线并行。3 年开发经验、5 年视频剪辑经验，做过自媒体博主与影视剧集剪辑。常驻淮安，开放远程与合作。',
    stats: [
      { value: 3, suffix: '+', label: '年开发经验' },
      { value: 5, suffix: '', label: '年视频剪辑' },
      { value: 3, suffix: '', label: '独立上线项目' },
    ],
  },

  about: {
    sub: '用代码和画面，把想法变成作品。',
    // 头像：public/avatar.jpg（彩色显示，见 AboutSection.vue）
    photo: '/avatar.jpg',
    photoAlt: '朱张成 · GG Bond 头像',
    // lead 含 <em> 强调标记，因此用 HTML 字符串 + v-html 渲染
    lead: '从第一行 <em>Hello World</em>，到剪映与 Premiere 的每一帧剪辑，我始终相信：<em>想法，值得用代码和画面诚实地落地</em>。',
    paragraphs: [
      '我是朱张成，一名自由创作者。具备前端、小程序和 ERP / 业务系统开发基础，能够完成从页面实现、接口联调到测试验证的工作；同时有 5 年视频剪辑经验，做过自媒体博主与影视剧集剪辑。',
      '有校园宣传管理和导师课题组经历，沟通协作与执行推进意识较强；保持持续学习，并能借助 AI 工具提升工作效率。常驻淮安，开放远程与合作。',
    ],
    facts: [
      { value: '中国 · 淮安', label: '常驻与远程' },
      { value: 'Vue / Java / 小程序 / PR / 剪映 / Agent', label: '主要技术栈' },
      { value: '开放合作中', label: '自由创作 · 远程' },
    ] as Fact[],
  },

  skills: {
    sub: '开发与创作并行的技能栈，按方向归类。',
    groups: [
      {
        num: '01 — Frontend',
        title: '前端与小程序',
        tags: ['Vue 3', 'Element Plus', '微信小程序', 'Node.js', 'WebSocket', 'REST API', 'Git'],
      },
      {
        num: '02 — Backend',
        title: '后端与数据',
        tags: ['Java', 'Spring Boot', 'MySQL', '数据库设计', '接口联调'],
      },
      {
        num: '03 — Creation',
        title: '视频创作',
        tags: ['Premiere Pro', '剪映', '影视剪辑', '自媒体运营', '脚本策划'],
      },
      {
        num: '04 — AI 效率',
        title: 'AI 工具',
        tags: ['Claude', 'Codex', 'AI 辅助开发', '持续学习'],
      },
    ] as SkillGroup[],
  },

  projects: {
    sub: '独立完成的完整项目，从前端到后端、从原型到上线。',
    items: [
      {
        slug: 'group-ordering',
        title: '多人共点餐系统',
        description:
          '原生微信小程序实现创建/加入点餐局、菜单浏览、共享购物车与订单提交，WebSocket 实时同步多端购物车；配套 Vue3 + Element Plus 管理后台与 Node.js REST API。',
        image:
          'https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/ZoYrbfVmTo0CSlxubRWc8ywcnDc',
        tech: ['微信小程序', 'WebSocket', 'Vue3', 'Element Plus', 'Node.js'],
        highlights: [
          '创建 / 加入点餐局，共享购物车多端实时同步',
          '管理后台覆盖分类、菜品、订单、图片上传与上下架',
          'Node.js 提供 REST API，前后端完整闭环',
        ],
      },
      {
        slug: 'scan-order',
        title: '餐厅堂食扫码点菜系统',
        description:
          '扫码选桌、多规格购物车、订单状态流转，覆盖商家接单、上菜、结账的完整业务闭环。',
        image:
          'https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/TidYbD6nToNpM2xRaQpczVzVn5c',
        tech: ['微信小程序', 'Node.js', 'REST API', '状态流转'],
        highlights: [
          '扫码选桌 + 多规格购物车',
          '订单状态全流程流转',
          '商家端接单 / 上菜 / 结账闭环',
        ],
      },
      {
        slug: 'what-to-eat',
        title: '「今天吃什么？」小程序',
        description:
          '12 个页面、220+ 条菜谱数据，支持多条件筛选、Canvas 轮盘抽取、历史收藏与自定义清单，通过 20 项算法与数据测试。',
        image:
          'https://media.doubao.com/space/api/box/stream/download/all_by_mount_point/TMEEbc5qboKhBpxwIFEcHMdpn9g',
        tech: ['微信小程序', 'Canvas', '筛选算法', '本地数据'],
        highlights: [
          '12 页面 + 220+ 菜谱数据',
          '多条件筛选 + Canvas 轮盘抽取',
          '历史收藏与自定义清单，20 项算法测试',
        ],
      },
    ] as Project[],
    more: {
      label: 'More on Gitee',
      titleHtml: '更多项目与<br>实验性作品',
      href: 'https://gitee.com/cc-bond',
    },
  },

  experience: {
    sub: '学习与工作的真实轨迹。',
    items: [
      {
        period: '2024.04 — 2024.12',
        role: '前端开发工程师',
        company: '北京东华博太 · 南京分公司',
        description:
          '负责前端业务开发，参与页面实现与接口联调，交付多个业务模块并保障上线质量。',
      },
      {
        period: '2020.09 — 2024.06',
        role: '软件工程 · 本科',
        company: '金陵科技学院',
        description:
          '系统学习软件工程，期间参与校园宣传管理与导师课题组项目，积累协作与执行经验。',
      },
    ] as ExperienceItem[],
  },

  blog: {
    sub: '开发与创作的实践记录。',
    posts: [
      {
        slug: 'wechat-miniapp-websocket-ordering',
        date: '2026.09.18',
        title: '微信小程序多人点餐：用 WebSocket 同步共享购物车的完整思路',
        category: '小程序',
        excerpt:
          '从建局、加入、共享购物车到订单提交，梳理多人共点餐系统里 WebSocket 多端状态同步的设计与踩坑。',
        body: [
          '多人共点餐的难点不在页面，而在“同一份购物车如何在多端保持一致”。本文以原生微信小程序 + WebSocket 为例，拆解建局、加入、菜单浏览、共享购物车到订单提交的完整链路，以及心跳、断线重连与消息去重等工程细节。',
          '核心思路是“服务端为准、端上订阅”：所有对购物车的变更先发到服务端，再由 WebSocket 广播给局内其他端，端上只做乐观更新与回滚，避免多端写冲突。文中附带了消息协议设计与关键代码片段，可直接复用。',
        ],
      },
      {
        slug: 'vue3-element-plus-admin',
        date: '2026.07.25',
        title: 'Vue3 + Element Plus 管理后台实战：从菜品管理到图片上传',
        category: '前端',
        excerpt:
          '用 Vue3 + Element Plus 搭一个可上线的管理后台：分类、菜品、订单管理，图片上传与上架下架。',
        body: [
          '管理后台是点餐系统的“另一半”。本文从零搭建 Vue3 + Element Plus 后台，覆盖分类与菜品管理、订单列表、图片上传（含预览与裁剪）、以及一键上架 / 下架，并给出组件拆分与接口封装的推荐结构。',
          '文中重点讨论了表单校验、列表分页与状态切换的常见坑，以及如何把重复的 CRUD 页面抽象成可复用的列表页模板，减少 30% 以上的样板代码。',
        ],
      },
      {
        slug: 'nodejs-rest-api-design',
        date: '2026.06.10',
        title: '用 Node.js 从零设计一套 REST API：点餐系统的后端实践',
        category: '后端',
        excerpt: '从路由划分、鉴权到错误处理，梳理一套可维护的 REST API 设计与实现规范。',
        body: [
          '好的 API 设计是前后端协作效率的关键。本文以点餐系统为例，从路由与资源划分、请求与响应格式、鉴权与权限控制，到统一的错误处理与日志，梳理一套小而完整的 REST API 规范。',
          '同时分享了如何在 Node.js 中组织项目结构、用中间件做鉴权与参数校验，以及如何为接口编写可回归的测试，让后端代码在功能迭代中保持稳定。',
        ],
      },
      {
        slug: 'video-editing-rhythm',
        date: '2026.05.06',
        title: '剪映 + Premiere：影视剪辑的节奏感，是可以练出来的',
        category: '创作',
        excerpt: '五年剪辑经验总结：节奏感不是天赋，而是对“切点、音乐、情绪”的刻意练习。',
        body: [
          '很多新手觉得“剪辑没节奏感”是天生的，其实不然。本文结合五年影视剪辑与自媒体经验，从选音乐、找切点、控制信息密度三个维度，拆解节奏感如何通过刻意练习建立起来。',
          '同时对比剪映与 Premiere 在卡点、转场与调色上的适用场景，给出一套“先粗剪定骨架、再精剪磨节奏”的可复用工作流，并附上练习片段的清单。',
        ],
      },
    ] as BlogPost[],
  },

  contact: {
    titleHtml: '一起做点什么？<br>保持联系。',
    email: '15850660186@163.com',
    domain: 'zhuzhangcheng.asia',
    socials: [
      { label: 'Gitee', href: 'https://gitee.com/cc-bond' },
      { label: '电话', href: 'tel:15850660186' },
      { label: '微信', href: '' },
    ] as SocialLink[],
  },

  footer: {
    year: 2026,
    note: '自由创作者 · GG Bond',
    en: 'PERSONAL WEBSITE — FREE CREATOR',
  },
}
