import type { Directive } from 'vue'

/**
 * v-reveal：滚动进入视口时给元素追加 .in，触发一次「上移 + 淡入」动画。
 * 用法：<div class="reveal" v-reveal>…</div>
 *
 * 注意：IntersectionObserver 仅存在于浏览器环境，因此延迟到 mounted 时才创建，
 * 避免在 SSG / 预渲染（Node 环境）导入阶段直接引用浏览器 API 导致报错。
 */
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer!.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
  }
  return observer
}

export const reveal: Directive<HTMLElement> = {
  mounted(el) {
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
