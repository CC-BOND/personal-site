<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import AppToast from '@/components/AppToast.vue'
import DetailOverlay from '@/components/DetailOverlay.vue'
</script>

<template>
  <SiteNav />
  <RouterView />
  <SiteFooter />
  <AppToast />
  <DetailOverlay />
</template>
