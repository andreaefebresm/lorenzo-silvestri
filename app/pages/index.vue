<script setup lang="ts">
const { $contentful } = useNuxtApp()
const { contentfulLocale } = useContentfulLocale()

const { data: projects } = await useProjectsList()

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
  <main>
    <PageGrid class="pt-5">
      <aside
        id="about"
        class="col-span-12 md:col-span-4 md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-6rem)] md:overflow-y-auto text-sm mb-10"
      >
        <section class="mb-10">
          <h2 class="uppercase font-medium mb-2.5">About</h2>
          <ContentfulRichText
            v-if="settings?.fields.aboutText"
            :document="settings.fields.aboutText as any"
            size="sm"
          />
        </section>

        <section class="mb-10">
          <h2 class="uppercase font-medium mb-2.5">Contacts</h2>
          <a
            v-if="settings?.fields.contactEmail"
            :href="`mailto:${settings.fields.contactEmail}`"
            class="font-light"
          >
            {{ settings.fields.contactEmail }}
          </a>
        </section>

        <section class="mb-10 md:mb-0">
          <h2 class="uppercase font-medium mb-2.5">Works</h2>
          <ProjectList class="font-light" :projects="projects?.items" />
        </section>
      </aside>

      <ul
        class="col-span-12 md:col-start-6 md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-2.5 gap-y-10 list-none p-0 mb-10"
      >
        <li v-for="project in projects?.items" :key="project.sys.id">
          <ProjectCard :project="project" :columns="0" />
        </li>
      </ul>
    </PageGrid>
  </main>
</template>