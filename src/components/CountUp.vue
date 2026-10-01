<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ to: number; suffix?: string }>()

const el = ref<HTMLElement | null>(null)
const text = ref(`0${props.suffix ?? ''}`)

let raf = 0
let observer: IntersectionObserver | undefined

onMounted(() => {
  const node = el.value
  if (!node) return

  const final = `${props.to}${props.suffix ?? ''}`
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.value = final
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return
      observer?.disconnect()
      const start = performance.now()
      const duration = 1100
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        text.value = `${Math.round(props.to * eased)}${props.suffix ?? ''}`
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    },
    { threshold: 0.6 },
  )
  observer.observe(node)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <b ref="el" class="count">{{ text }}</b>
</template>

<style scoped>
.count {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(30px, 3.4vw, 52px);
  line-height: 1;
  min-width: 2.6ch;
}
</style>
