<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { site } from '@/data/site'
import type { SocialLink } from '@/types'

const toast = useToast()

function onSocial(e: MouseEvent, social: SocialLink) {
  // 未配置真实链接时回退到 Toast 占位
  if (!social.href) {
    e.preventDefault()
    toast.show()
  }
}
</script>

<template>
  <section class="contact" id="contact">
    <div class="wrap">
      <span class="section-index">06 / Contact</span>
      <h2 class="contact-title" v-html="site.contact.titleHtml"></h2>
      <a class="contact-mail" :href="`mailto:${site.contact.email}`">
        {{ site.contact.email }}
        <span class="mail-arr">→</span>
      </a>
      <div class="contact-socials">
        <a
          v-for="s in site.contact.socials"
          :key="s.label"
          :href="s.href || '#'"
          @click="onSocial($event, s)"
        >
          {{ s.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-top: none;
  background: var(--ink);
  color: var(--white);
  padding: 130px 0;
}
.contact .section-index {
  color: rgba(255, 255, 255, 0.5);
}
.contact-title {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(40px, 7vw, 88px);
  line-height: 1.15;
  margin: 22px 0 40px;
}
.contact-mail {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  gap: 14px;
  font-family: var(--font-en);
  font-size: clamp(18px, 2.6vw, 30px);
  font-weight: 500;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  padding-bottom: 8px;
  transition: border-color 0.25s;
}
.contact-mail:hover {
  border-color: var(--white);
}
.mail-arr {
  font-size: 0.5em;
}
.contact-socials {
  display: flex;
  gap: 34px;
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}
.contact-socials a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  transition: color 0.2s;
}
.contact-socials a:hover {
  color: var(--white);
}
</style>
