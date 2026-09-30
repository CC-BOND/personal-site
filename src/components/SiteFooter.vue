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
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.footer p {
  font-size: 13px;
  color: var(--gray);
}
.footer .en {
  font-family: var(--font-en);
}
</style>
