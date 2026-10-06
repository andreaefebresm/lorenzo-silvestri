<script setup lang="ts">
const { $contentful } = useNuxtApp()
const { contentfulLocale } = useContentfulLocale()
const route = useRoute()

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

const { data: projects } = await useProjectsList()

const slug = computed(() => {
  const s = route.params.slug
  return typeof s === 'string' ? s : null
})

const listedIndex = computed(() =>
  slug.value
    ? (projects.value?.items ?? []).findIndex((p: any) => p.fields.slug === slug.value)
    : -1
)

// titolo dei progetti che non sono nella lista della home
const { data: unlistedTitle } = await useAsyncData(
  'current-project-title',
  async () => {
    if (!slug.value || listedIndex.value >= 0) return null
    const res = await $contentful.getEntries({
      content_type: 'project',
      locale: contentfulLocale.value,
      'fields.slug': slug.value,
      include: 0,
      limit: 1,
    })
    return (res.items[0]?.fields.title as string | undefined) ?? null
  },
  { watch: [slug, contentfulLocale] }
)

const current = computed(() => {
  if (!slug.value) return null
  if (listedIndex.value >= 0) {
    const p: any = projects.value!.items[listedIndex.value]
    return { slug: slug.value, number: listedIndex.value + 1, title: p.fields.title as string }
  }
  if (unlistedTitle.value) {
    return { slug: slug.value, number: null, title: unlistedTitle.value }
  }
  return null
})
</script>

<template>
  <div class="site">
    <SiteHeader
      :settings="settings"
      :projects="projects?.items"
      :current="current"
    />
    <slot />
    <SiteFooter :settings="settings" />
  </div>
</template>
