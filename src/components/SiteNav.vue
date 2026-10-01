<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { site } from '@/data/site'

const route = useRoute()

const open = ref(false)
const progress = ref(0)
const active = ref('')
const onDark = ref(false)

let ticking = false

function update() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? doc.scrollTop / max : 0

  // 滚动高亮：取当前滚动位置往上、最靠近视口 35% 处的区块
  const probe = window.innerHeight * 0.35
  let current = ''
  document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => {
    if (section.getBoundingClientRect().top <= probe) current = section.id
  })
  active.value = current

  // 滚动到深色联系区时，固定导航自动反色
  const contact = document.getElementById('contact')
  if (contact) {
    const rect = contact.getBoundingClientRect()
    const navH = 76
    onDark.value = rect.top <= navH && rect.bottom > navH
  } else {
    onDark.value = false
  }
  ticking = false
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

function close() {
  open.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <header class="nav" :class="{ open, 'on-dark': onDark }">
    <RouterLink to="/" class="nav-brand" aria-label="回到首页" @click="close">
      <span class="nav-mark">{{ site.logoMark }}</span>
      <span class="nav-name">{{ site.name }}</span>
      <span class="nav-en">{{ site.nameEn }}</span>
    </RouterLink>

    <nav class="nav-links">
      <RouterLink
        v-for="item in site.nav"
        :key="item.id"
        :to="{ path: '/', hash: `#${item.id}` }"
        :class="{ active: active === item.id && route.path === '/' }"
        @click="close"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="nav-status"><i></i>OPEN FOR WORK</div>

    <button class="nav-toggle" :aria-expanded="open" aria-label="菜单" @click="open = !open">
      <i></i><i></i><i></i>
    </button>

    <span class="nav-progress" :style="{ '--p': progress }"></span>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 var(--pad);
  background: rgba(242, 240, 234, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  transition: background 0.3s, color 0.3s;
}
.nav.on-dark {
  background: rgba(19, 18, 17, 0.9);
  color: var(--paper);
  border-bottom-color: rgba(242, 240, 234, 0.16);
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.nav-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex: none;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 19px;
  transition: background 0.3s, color 0.3s;
}
.nav.on-dark .nav-mark {
  background: var(--accent);
  color: var(--ink);
}
.nav-name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 20px;
  white-space: nowrap;
}
.nav-en {
  font-family: var(--font-en);
  font-size: 12px;
  letter-spacing: 0.24em;
  color: var(--gray);
  white-space: nowrap;
}
.nav-links {
  display: flex;
  gap: clamp(18px, 2.4vw, 42px);
  margin-left: auto;
}
.nav-links a {
  font-size: 15px;
  color: var(--gray);
  position: relative;
  padding: 6px 0;
  white-space: nowrap;
  transition: color 0.25s;
}
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5px;
  width: 0;
  background: var(--accent);
  transition: width 0.3s var(--ease);
}
.nav-links a:hover,
.nav-links a.active {
  color: var(--ink);
}
.nav-links a.active::after {
  width: 100%;
}
.nav.on-dark .nav-links a:hover,
.nav.on-dark .nav-links a.active {
  color: var(--paper);
}
.nav-status {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--gray);
}
.nav-status i {
  width: 8px;
  height: 8px;
  background: var(--accent);
  flex: none;
  animation: nav-pulse 2.4s infinite;
}
@keyframes nav-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
.nav-progress {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 100%;
  background: var(--accent);
  transform-origin: left center;
  transform: scaleX(var(--p, 0));
}
.nav-toggle {
  display: none;
  width: 42px;
  height: 42px;
  position: relative;
  flex: none;
  margin-left: auto;
}
.nav-toggle i {
  position: absolute;
  left: 9px;
  right: 9px;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.3s, opacity 0.3s;
}
.nav-toggle i:nth-child(1) {
  top: 14px;
}
.nav-toggle i:nth-child(2) {
  top: 20px;
}
.nav-toggle i:nth-child(3) {
  top: 26px;
}
.nav.open .nav-toggle i:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.nav.open .nav-toggle i:nth-child(2) {
  opacity: 0;
}
.nav.open .nav-toggle i:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

@media (max-width: 860px) {
  .nav-links {
    position: fixed;
    left: 0;
    right: 0;
    top: var(--nav-h);
    flex-direction: column;
    gap: 0;
    margin: 0;
    padding: 6px 0 14px;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
    transform: translateY(-115%);
    transition: transform 0.35s var(--ease);
  }
  .nav.on-dark .nav-links {
    background: var(--ink);
  }
  .nav.open .nav-links {
    transform: none;
  }
  .nav-links a {
    padding: 14px var(--pad);
    font-size: 16px;
  }
  .nav-status {
    display: none;
  }
  .nav-toggle {
    display: block;
  }
}
</style>
