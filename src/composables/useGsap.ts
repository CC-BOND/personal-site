type GsapModule = typeof import('gsap')
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')

export interface GsapBundle {
  gsap: GsapModule['gsap']
  ScrollTrigger: ScrollTriggerModule['ScrollTrigger']
}

// 模块级单例：GSAP + ScrollTrigger 只在第一次用到时动态加载，插件也只注册一次。
// 这样 GSAP 不会进首屏 bundle（SSG 预渲染时也不会被加载）。
let pending: Promise<GsapBundle> | null = null

export function loadGsap(): Promise<GsapBundle> {
  if (!pending) {
    pending = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([core, trigger]) => {
        core.gsap.registerPlugin(trigger.ScrollTrigger)
        return { gsap: core.gsap, ScrollTrigger: trigger.ScrollTrigger }
      },
    )
  }
  return pending
}
