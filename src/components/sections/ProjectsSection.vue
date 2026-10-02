<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHead from '@/components/SectionHead.vue'
import { loadGsap } from '@/composables/useGsap'
import { useDetailOverlay } from '@/composables/useDetailOverlay'
import { useToast } from '@/composables/useToast'
import { site } from '@/data/site'
import type { Project } from '@/types'

const overlay = useDetailOverlay()
const toast = useToast()

const root = ref<HTMLElement | null>(null)
let ctx: { revert: () => void } | undefined

/** 普通左键点击走浮层；带修饰键 / 中键仍然跳到真实详情页。 */
function onCardClick(event: MouseEvent, project: Project) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  overlay.open({ kind: 'project', project })
}

function onMore(event: MouseEvent) {
  // 未配置真实链接时回退到 Toast 占位
  if (!site.projects.more.href) {
    event.preventDefault()
    toast.show()
  }
}

onMounted(async () => {
  const el = root.value
  if (!el) return
  // 跟随系统的「减少动态效果」设置：不动画，卡片就是普通的一列
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { gsap, ScrollTrigger } = await loadGsap()
  if (!el.isConnected) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card', el)

    function setActive(index: number) {
      cards.forEach((item, k) => item.classList.toggle('is-active', k === index))
    }

    cards.forEach((card, i) => {
      const inner = card.querySelector<HTMLElement>('.card-inner')
      const shade = card.querySelector<HTMLElement>('.card-shade')
      const image = card.querySelector<HTMLElement>('.card-media img')
      const next = cards[i + 1]
      const depth = cards.length - 1 - i

      // 1) 被下一张压住时：按「下面还压着几张」递减缩放 + 极轻压暗
      if (next && inner && shade && depth > 0) {
        const range = { trigger: next, start: 'top 90%', end: 'top 14%', scrub: true }
        gsap.to(inner, { scale: 1 - depth * 0.035, ease: 'none', scrollTrigger: { ...range } })
        gsap.fromTo(shade, { opacity: 0 }, { opacity: 0.12, ease: 'none', scrollTrigger: { ...range } })
      }

      // 2) 图片轻微视差，制造纵深
      if (image) {
        gsap.fromTo(
          image,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }

      // 3) 谁在最上面 → is-active（顶部强调线 + 图片转彩）
      ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    })

  }, el)

  // 字体与图片加载完刷新触发点
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  if (document.readyState === 'complete') refresh()
  else window.addEventListener('load', refresh, { once: true })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="section wrap projects" id="projects">
    <SectionHead index="03 / Projects" title="精选项目" :sub="site.projects.sub" />

    <div class="stack">
      <RouterLink
        v-for="(project, i) in site.projects.items"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="stack-card"
        :class="{ 'is-active': i === 0 }"
        :style="{ '--i': i }"
        @click="onCardClick($event, project)"
      >
        <div class="card-inner">
          <div class="card-top">
            <span class="idx">
              {{ String(i + 1).padStart(2, '0') }} / {{ String(site.projects.items.length).padStart(2, '0') }}
            </span>
            <span class="meta sp">{{ project.tech.slice(0, 3).join(' · ') }}</span>
          </div>

          <div class="card-main">
            <div class="card-text">
              <h3>{{ project.title }}</h3>
              <p class="card-desc">{{ project.description }}</p>
              <ul class="card-points">
                <li v-for="(item, k) in project.highlights.slice(0, 2)" :key="k">{{ item }}</li>
              </ul>
              <div class="card-tech">
                <span v-for="item in project.tech.slice(0, 4)" :key="item" class="tag">{{ item }}</span>
              </div>
            </div>
            <figure class="card-media">
              <img :src="project.image" :alt="project.title" loading="lazy" />
            </figure>
          </div>

          <div class="card-foot">
            <span class="meta">CASE STUDY</span>
            <span class="card-cta">查看详情 <span class="arr">→</span></span>
          </div>

          <div class="card-shade"></div>
        </div>
      </RouterLink>
    </div>

    <a
      class="stack-end"
      :href="site.projects.more.href || '#'"
      target="_blank"
      rel="noopener"
      @click="onMore"
    >
      <span class="meta">{{ site.projects.more.label }}</span>
      <span class="more">
        <span v-html="site.projects.more.titleHtml"></span>
        <span class="arr">→</span>
      </span>
    </a>
  </section>
</template>

<style scoped>
.projects {
  --stack-top: 112px;
  --stack-step: 20px;
}

.stack {
  position: relative;
  margin-top: clamp(36px, 4.4vw, 64px);
  padding-bottom: clamp(40px, 10vh, 140px);
}
.stack-card {
  position: sticky;
  top: calc(var(--stack-top) + var(--i) * var(--stack-step));
  display: block;
  margin-bottom: clamp(18px, 3vw, 40px);
}
.card-inner {
  position: relative;
  background: var(--white);
  border: 1px solid var(--line);
  height: clamp(430px, 60vh, 600px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 60px -40px rgba(19, 18, 17, 0.5);
  transform-origin: top center;
  transition: border-color 0.4s;
}
.stack-card.is-active .card-inner {
  border-color: var(--line-strong);
}
.card-inner::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 3px;
  width: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s var(--ease);
}
.stack-card.is-active .card-inner::before {
  transform: scaleX(1);
}

.card-top {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 28px);
  padding: clamp(16px, 1.6vw, 24px) clamp(18px, 2.4vw, 40px);
  border-bottom: 1px solid var(--line);
  flex: none;
}
.idx {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.14em;
  white-space: nowrap;
}
.card-top .sp {
  margin-left: auto;
}

.card-main {
  display: flex;
  gap: clamp(20px, 3vw, 52px);
  padding: clamp(20px, 2.6vw, 44px);
  flex: 1;
  min-height: 0;
}
.card-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.card-text h3 {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(24px, 3vw, 46px);
  line-height: 1.15;
}
.card-desc {
  margin-top: 16px;
  color: var(--ink-soft);
  font-size: clamp(14px, 1.05vw, 17px);
  max-width: 620px;
}
.card-points {
  list-style: none;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card-points li {
  position: relative;
  padding-left: 20px;
  font-size: clamp(13px, 1vw, 16px);
  color: var(--ink-soft);
}
.card-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 9px;
  height: 2px;
  background: var(--accent);
}
.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: auto;
  padding-top: 20px;
}

.card-media {
  flex: 0 0 42%;
  align-self: stretch;
  overflow: hidden;
  background: var(--paper-deep);
  position: relative;
  min-height: 0;
}
.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  will-change: transform;
  transition: filter 0.6s var(--ease);
}
.stack-card.is-active .card-media img {
  filter: grayscale(0);
}

.card-foot {
  display: flex;
  align-items: center;
  gap: 18px;
  flex: none;
  padding: clamp(14px, 1.4vw, 20px) clamp(18px, 2.4vw, 40px);
  border-top: 1px solid var(--line);
}
.card-cta {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid var(--ink);
  padding: 11px 26px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.28s, color 0.28s;
}
.stack-card:hover .card-cta {
  background: var(--ink);
  color: var(--paper);
}
.card-cta .arr {
  font-family: var(--font-en);
  transition: transform 0.28s var(--ease);
}
.stack-card:hover .card-cta .arr {
  transform: translateX(5px);
}

.card-shade {
  position: absolute;
  inset: 0;
  background: var(--ink);
  opacity: 0;
  pointer-events: none;
  z-index: 5;
}

.stack-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: clamp(26px, 2.6vw, 42px) 0 clamp(40px, 6vw, 90px);
  border-top: 1px solid var(--line);
}
.stack-end .more {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: var(--ink);
  color: var(--paper);
  padding: 20px 34px;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(17px, 1.5vw, 24px);
  line-height: 1.5;
}
.stack-end .more .arr {
  color: var(--accent);
  font-family: var(--font-en);
  transition: transform 0.28s var(--ease);
}
.stack-end:hover .more .arr {
  transform: translateX(6px);
}

@media (max-width: 960px) {
  .card-main {
    flex-direction: column-reverse;
  }
  .card-media {
    flex: 0 0 auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    max-height: 34%;
  }
  .card-text h3 {
    font-size: clamp(22px, 4vw, 32px);
  }
  .card-points {
    display: none;
  }
}
@media (max-width: 860px) {
  .projects {
    --stack-top: 88px;
    --stack-step: 14px;
  }
  .card-inner {
    height: clamp(420px, 66vh, 560px);
  }
  .card-top {
    gap: 10px;
  }
  /* 窄屏放不下：顶部条只留序号，技术标签卡身里已经有了 */
  .card-top .meta {
    display: none;
  }
  .card-desc {
    font-size: 14px;
  }
}
</style>
