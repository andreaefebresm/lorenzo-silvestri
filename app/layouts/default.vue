<script setup lang="ts">
const { $contentful } = useNuxtApp()
const { contentfulLocale } = useContentfulLocale()

const { data: settingsResult } = await useAsyncData(
  'site-settings-footer',
  () => $contentful.getEntries({
    content_type: 'siteSettings',
    locale: contentfulLocale.value,
    limit: 1,
  }),
  { watch: [contentfulLocale] }
)

const settings = computed(() => settingsResult.value?.items?.[0])
</script>

<template>
  <div class="site">
    <SiteHeader :settings="settings" />
    <slot />
    <SiteFooter :settings="settings" />
  </div>
</template>
