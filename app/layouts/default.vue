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

// progetti non in home: titolo e, se sono figli di un collector, la sigla del genitore
const { data: unlisted } = await useAsyncData(
  'current-unlisted',
  async () => {
    if (!slug.value || listedIndex.value >= 0) return null

    const [own, collectors] = await Promise.all([
      $contentful.getEntries({
        content_type: 'project',
        locale: contentfulLocale.value,
        'fields.slug': slug.value,
        include: 0,
        limit: 1,
      }),
      $contentful.getEntries({
        content_type: 'project',
        locale: contentfulLocale.value,
        'fields.projectKind': 'collector',
        include: 2,
        limit: 20,
      }),
    ])

    const title = own.items[0]?.fields.title as string | undefined
    if (!title) return null

    const parent: any = collectors.items.find((c: any) =>
      ((c.fields.collectorEntries as any[]) ?? []).some(
        (e) => e?.fields?.project?.fields?.slug === slug.value
      )
    )

    if (!parent) return { title, parentLabel: null, parentNumber: null }

    const parentIndex = (projects.value?.items ?? []).findIndex(
      (p: any) => p.fields.slug === parent.fields.slug
    )

    return {
      title,
      parentLabel: (parent.fields.shortTitle || parent.fields.title) as string,
      parentNumber: parentIndex >= 0 ? parentIndex + 1 : null,
    }
  },
  { watch: [slug, contentfulLocale] }
)

const current = computed(() => {
  if (!slug.value) return null
  if (listedIndex.value >= 0) {
    const p: any = projects.value!.items[listedIndex.value]
    return {
      slug: slug.value,
      number: listedIndex.value + 1,
      title: p.fields.title as string,
      parentLabel: null as string | null,
      parentNumber: null as number | null,
    }
  }
  if (unlisted.value) {
    return {
      slug: slug.value,
      number: null,
      title: unlisted.value.title,
      parentLabel: unlisted.value.parentLabel,
      parentNumber: unlisted.value.parentNumber,
    }
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