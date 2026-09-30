import { ref } from 'vue'
import { site } from '@/data/site'

// 模块级单例状态：全站共享同一个 Toast 实例。
const message = ref(site.toastMessage)
const visible = ref(false)

let timer: ReturnType<typeof setTimeout> | undefined

export function useToast() {
  function show(msg?: string) {
    if (msg) message.value = msg
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, 2200)
  }

  return { message, visible, show }
}
