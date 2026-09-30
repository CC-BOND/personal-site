<script setup lang="ts">
defineProps<{
  index: string
  title: string
  sub: string
}>()
</script>

<template>
  <div class="section-head">
    <span class="section-index">{{ index }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p class="section-sub">{{ sub }}</p>
  </div>
</template>
