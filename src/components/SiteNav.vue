<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { site } from '@/data/site'

const open = ref(false)

function close() {
  open.value = false
}
</script>

<template>
  <header class="nav" :class="{ open }">
    <div class="wrap nav-inner">
      <RouterLink to="/" class="nav-logo" @click="close">
        <span class="logo-mark">{{ site.logoMark }}</span>
        <span class="logo-word">
          {{ site.name }}
          <span class="logo-en">{{ site.nameEn }}</span>
        </span>
      </RouterLink>

      <nav class="nav-links" :aria-expanded="open">
        <RouterLink
          v-for="item in site.nav"
          :key="item.id"
          :to="{ path: '/', hash: `#${item.id}` }"
          @click="close"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <button
        class="nav-toggle"
        :aria-expanded="open"
        aria-label="菜单"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(247, 247, 244, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
}
.logo-mark {
  width: 30px;
  height: 30px;
  background: var(--ink);
  color: var(--white);
  display: grid;
  place-items: center;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 17px;
}
.logo-word {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.04em;
}
.logo-en {
  font-family: var(--font-en);
  font-weight: 400;
  font-size: 13px;
  color: var(--gray);
}
.nav-links {
  display: flex;
  gap: 34px;
}
.nav-links a {
  font-size: 14px;
  color: var(--ink-soft);
  position: relative;
  padding: 4px 0;
  transition: color 0.2s;
}
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 0;
  background: var(--ink);
  transition: width 0.25s ease;
}
.nav-links a:hover::after {
  width: 100%;
}
.nav-links a:hover {
  color: var(--ink);
}
.nav-toggle {
  display: none;
  width: 44px;
  height: 44px;
  position: relative;
}
.nav-toggle span {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 2px;
  background: var(--ink);
  transition: transform 0.3s, opacity 0.3s;
}
.nav-toggle span:nth-child(1) {
  top: 15px;
}
.nav-toggle span:nth-child(2) {
  top: 23px;
}
.nav-toggle span:nth-child(3) {
  top: 31px;
}
.nav.open .nav-toggle span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.nav.open .nav-toggle span:nth-child(2) {
  opacity: 0;
}
.nav.open .nav-toggle span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--paper);
    flex-direction: column;
    gap: 0;
    padding: 10px 0 20px;
    border-bottom: 1px solid var(--line);
    transform: translateY(-120%);
    transition: transform 0.3s ease;
  }
  .nav.open .nav-links {
    transform: none;
  }
  .nav-links a {
    padding: 14px 22px;
    font-size: 16px;
  }
  .nav-toggle {
    display: block;
  }
}
</style>
