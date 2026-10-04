<script setup lang="ts">
const { $contentful } = useNuxtApp()
const { contentfulLocale } = useContentfulLocale()

const { data: projects } = await useProjectsList()

const { data: settingsResult } = await useAsyncData(
  'site-settings',
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
    <PageGrid>
      <div class="col-span-12 flex flex-col md:justify-end min-h-0 md:min-h-[calc(100vh-80px)]">
        <div class="grid grid-cols-12">
          <div class="col-span-12 border-t border-black"></div>

          <section id="about" class="col-span-12 md:col-span-5 md:pr-2.5">
            <h2 class="uppercase font-medium mt-5">About</h2>
            <ContentfulRichText v-if="settings?.fields.aboutText" :document="settings.fields.aboutText as any" />
          </section>

          <section class="col-span-12 md:col-span-3 md:border-l border-black md:px-2.5">
            <h2 class="uppercase font-medium mt-5">Contacts</h2>
            <a v-if="settings?.fields.contactEmail" :href="`mailto:${settings.fields.contactEmail}`" class="font-light">
              {{ settings?.fields.contactEmail }}
            </a>
          </section>

          <section class="col-span-12 md:col-span-4 md:border-l border-black md:pl-2.5">
            <h2 class="uppercase font-medium mt-5">Works</h2>
            <ol class="font-light">
              <li v-for="(project, index) in projects?.items" :key="project.sys.id">
                <NuxtLink :to="`/${project.fields.slug}`">
                  {{ index + 1 }}. {{ project.fields.title }}
                </NuxtLink>
              </li>
            </ol>
          </section>
        </div>
      </div>

      <ul class="col-span-10 col-start-2 grid grid-cols-12 gap-2.5 list-none p-0 my-10 ">
        <li v-for="project in projects?.items" :key="project.sys.id" class="col-span-12 md:col-span-6">
          <ProjectCard :project="project" :columns="6" />
        </li>
      </ul>
    </PageGrid>
  </main>
</template>
