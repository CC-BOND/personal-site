import { ref } from 'vue'
import type { BlogPost, Project } from '@/types'

export type OverlayPayload =
  | { kind: 'project'; project: Project }
  | { kind: 'post'; post: BlogPost }

// 模块级单例：首页任何区块都能唤起同一个详情浮层。
// 子页路由 /projects/:slug、/blog/:slug 仍然保留，供直接访问与爬虫抓取。
const payload = ref<OverlayPayload | null>(null)

export function useDetailOverlay() {
  function open(next: OverlayPayload) {
    payload.value = next
  }
  function close() {
    payload.value = null
  }
  return { payload, open, close }
}
