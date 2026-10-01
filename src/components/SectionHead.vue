<script setup lang="ts">
defineProps<{
  index: string
  title: string
  sub: string
}>()
</script>

<template>
  <div class="section-head">
    <span class="meta reveal" v-reveal>{{ index }}</span>
    <h2><span class="reveal" data-d="1" v-reveal>{{ title }}</span></h2>
    <p class="reveal" data-d="2" v-reveal>{{ sub }}</p>
  </div>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: flex-end;
  gap: clamp(16px, 2vw, 32px);
  flex-wrap: wrap;
}
.meta {
  padding-bottom: 8px;
}
h2 {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(30px, 3.6vw, 56px);
  line-height: 1.05;
}
p {
  margin-left: auto;
  max-width: 420px;
  font-family: var(--font-en);
  font-size: clamp(13px, 1vw, 17px);
  color: var(--gray);
  text-align: right;
  line-height: 1.6;
}

@media (max-width: 860px) {
  p {
    margin-left: 0;
    text-align: left;
    max-width: none;
  }
}
</style>
