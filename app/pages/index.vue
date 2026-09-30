<script setup lang="ts">
const { $contentful } = useNuxtApp()
const { contentfulLocale } = useContentfulLocale()

const { data: projects } = await useAsyncData(
    'projects-list',
    () => $contentful.getEntries({
        content_type: 'project',
        locale: contentfulLocale.value,
        'fields.published': true,
        order: ['fields.order'],
    }),
    { watch: [contentfulLocale] }
)

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
            <div class="col-span-12 flex flex-col justify-end min-h-[calc(100vh-80px)]">
                <div class="grid grid-cols-12 gap-2.5">
                    <div class="col-span-12 border-t border-black"></div>

                    <section id="about" class="col-span-5 pr-2.5 pt-3">
                        <h2 class="uppercase font-medium pb-3">About</h2>
                        <ContentfulRichText v-if="settings?.fields.aboutText"
                            :document="settings.fields.aboutText as any" />
                    </section>

                    <section class="col-span-3 border-l border-black px-2.5 mt-5">
                        <h2 class="uppercase font-medium  pb-3">Contacts</h2>
                        <a v-if="settings?.fields.contactEmail" :href="`mailto:${settings.fields.contactEmail}`">
                            {{ settings?.fields.contactEmail }}
                        </a>
                    </section>

                    <section class="col-span-4 border-l border-black pl-2.5 mt-5">
                        <h2 class="uppercase font-medium  pb-3">Works</h2>
                        <ol>
                            <li v-for="(project, index) in projects?.items" :key="project.sys.id">
                                <NuxtLink :to="`/${project.fields.slug}`">
                                    {{ index + 1 }}. {{ project.fields.title }}
                                </NuxtLink>
                            </li>
                        </ol>
                    </section>
                </div>
            </div>

            <<ul class="col-span-8 col-start-3 grid grid-cols-12 gap-2.5 list-none p-0 mt-10">
              <li
                v-for="project in projects?.items"
                :key="project.sys.id"
                class="col-span-6"
              >
                <ProjectCard :project="project" />
              </li>
            </ul>
        </PageGrid>
    </main>
</template>
