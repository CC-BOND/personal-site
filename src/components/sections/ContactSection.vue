<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { site } from '@/data/site'
import type { SocialLink } from '@/types'

const toast = useToast()

function onSocial(event: MouseEvent, social: SocialLink) {
  // 未配置真实链接时回退到 Toast 占位
  if (!social.href) {
    event.preventDefault()
    toast.show()
  }
}
</script>

<template>
  <section class="contact" id="contact">
    <div class="wrap">
      <div class="contact-top">
        <span class="meta">06 / Contact</span>
        <span class="meta contact-flag"><i></i>OPEN FOR WORK · 2026</span>
      </div>

      <h2 class="reveal" v-reveal v-html="site.contact.titleHtml"></h2>

      <a class="contact-mail reveal" data-d="1" v-reveal :href="`mailto:${site.contact.email}`">
        {{ site.contact.email }}
        <span class="arr">→</span>
      </a>

      <div class="contact-socials reveal" data-d="2" v-reveal>
        <a
          v-for="social in site.contact.socials"
          :key="social.label"
          :href="social.href || '#'"
          :target="social.href.startsWith('http') ? '_blank' : undefined"
          :rel="social.href.startsWith('http') ? 'noopener' : undefined"
          @click="onSocial($event, social)"
        >
          {{ social.label }}
        </a>
      </div>

      <div class="contact-sign reveal" data-d="3" v-reveal>
        <span class="who">
          <span class="sq"></span>
          <b>{{ site.name }} · {{ site.nameEn }}</b>
        </span>
        <span class="domain">{{ site.contact.domain }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--ink);
  color: var(--paper);
  padding-block: clamp(80px, 9vw, 140px);
}
.contact-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.contact .meta {
  color: var(--accent);
}
.contact .contact-flag {
  color: rgba(242, 240, 234, 0.55);
}
.contact-flag i {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--accent);
  margin-right: 10px;
}
.contact h2 {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(38px, 6.2vw, 104px);
  line-height: 1.2;
  margin: clamp(28px, 3.4vw, 54px) 0 0;
}
.contact-mail {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-top: clamp(30px, 3.6vw, 60px);
  font-family: var(--font-en);
  font-weight: 500;
  font-size: clamp(19px, 2.5vw, 44px);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 8px;
  word-break: break-all;
  transition: color 0.3s;
}
.contact-mail:hover {
  color: var(--accent);
}
.contact-mail .arr {
  font-size: 0.7em;
  color: var(--accent);
  transition: transform 0.3s var(--ease);
}
.contact-mail:hover .arr {
  transform: translateX(8px);
}
.contact-socials {
  display: flex;
  gap: clamp(20px, 2.6vw, 46px);
  flex-wrap: wrap;
  margin-top: clamp(30px, 3.4vw, 52px);
  padding-top: 28px;
  border-top: 1px solid rgba(242, 240, 234, 0.16);
}
.contact-socials a {
  font-size: 15px;
  color: rgba(242, 240, 234, 0.66);
  transition: color 0.25s;
}
.contact-socials a:hover {
  color: var(--paper);
}
.contact-sign {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-top: clamp(50px, 6vw, 100px);
  flex-wrap: wrap;
}
.contact-sign .who {
  display: flex;
  align-items: center;
  gap: 16px;
}
.contact-sign .sq {
  width: 38px;
  height: 38px;
  background: var(--accent);
  flex: none;
}
.contact-sign .who b {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(19px, 1.7vw, 28px);
}
.contact-sign .domain {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.14em;
  color: rgba(242, 240, 234, 0.55);
}
</style>
