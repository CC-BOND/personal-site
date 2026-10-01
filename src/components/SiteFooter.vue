<script setup lang="ts">
import { site } from '@/data/site'
</script>

<template>
  <footer class="footer wrap">
    <p>© {{ site.footer.year }} {{ site.name }} · {{ site.footer.note }}</p>
    <p class="en">{{ site.footer.en }}</p>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 34px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  border-top: 1px solid var(--line);
}
.footer p {
  font-size: 12.5px;
  color: var(--gray);
  font-family: var(--font-en);
  letter-spacing: 0.06em;
}

@media (max-width: 860px) {
  .footer {
    flex-direction: column;
  }
}
</style>
