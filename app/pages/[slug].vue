<script setup lang="ts">
const route = useRoute()
const { $contentful } = useNuxtApp()
const { contentfulLocale } = useContentfulLocale()

const { data: result } = await useAsyncData(
  `project-${route.params.slug}`,
  () => $contentful.getEntries({
    content_type: 'project',
    locale: contentfulLocale.value,
    'fields.slug': route.params.slug as string,
    limit: 1,
    include: 3,
  }),
  { watch: [contentfulLocale] }
)

const project = computed(() => result.value?.items?.[0])

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const kind = computed(() => project.value?.fields.projectKind || 'standard')
</script>

<template>
  <main v-if="project" class="mb-16">
    <PageGrid>
      <!-- SLOT 1: cover + titolo + cartiglio -->
      <div class="col-span-12 md:col-span-8 flex flex-col md:h-[calc(100vh-56px)]">
        <NuxtImg
          v-if="project.fields.heroImage ?? project.fields.coverImage"
          :src="`https:${((project.fields.heroImage ?? project.fields.coverImage) as any)?.fields?.file?.url}`"
          :alt="project.fields.title as string"
          provider="contentful"
          width="1400"
          class="flex-1 md:min-h-0 w-full object-cover aspect-[4/5] md:aspect-auto"
        />
        <h1 class="text-2xl md:text-4xl font-semibold mt-5">{{ project.fields.title }}</h1>
        <p v-if="project.fields.tagline" class="text-[#BEBEBE] text-lg md:text-2xl font-semibold mt-2">
          {{ project.fields.tagline }}
        </p>
      </div>

      <aside class="col-span-12 md:col-start-9 md:col-span-4 md:pl-5 mt-5 md:mt-0 md:h-[calc(100vh-56px)]">
        <div v-if="project.fields.scope" class="mb-8">
          <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">Scope</h3>
          <p class="text-sm font-light">{{ project.fields.scope }}</p>
        </div>
        <div v-if="project.fields.client" class="mb-8">
          <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">Client</h3>
          <p class="text-sm font-light">{{ project.fields.client }}</p>
        </div>
        <div v-if="(project.fields.credits as string[])?.length" class="mb-8">
          <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">Credits</h3>
          <p v-for="c in (project.fields.credits as string[])" :key="c" class="text-sm font-light">{{ c }}</p>
        </div>
        <div v-if="project.fields.year" class="mb-8">
          <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">Year</h3>
          <p class="text-sm font-light">{{ project.fields.year }}</p>
        </div>
        <div v-if="project.fields.featured" class="mb-8">
          <h3 class="uppercase font-light text-xl text-[#BEBEBE]">Featured</h3>
          <ContentfulRichText :document="project.fields.featured as any" size="sm" />
        </div>
      </aside>

      <!-- VARIANTE standard -->
      <template v-if="kind === 'standard'">
        <section
          v-if="project.fields.bodyText"
          class="col-span-12 md:col-start-3 md:col-span-8 mt-16 text-xl md:text-2xl text-center"
        >
          <ContentfulRichText :document="project.fields.bodyText as any" />
        </section>

        <div class="col-span-12 mt-16">
          <template v-if="(project.fields.contentBlocks as any[])?.length">
            <ProjectContentBlock
              v-for="block in (project.fields.contentBlocks as any[])"
              :key="block.sys.id"
              :block="block"
            />
          </template>

          <!-- fallback per progetti non ancora migrati a contentBlocks -->
          <div v-else class="grid grid-cols-12 gap-2.5">
            <div class="col-span-12 md:col-span-8">
              <NuxtImg
                v-for="(img, i) in (project.fields.gallery as any[])"
                :key="i"
                :src="`https:${img.fields.file.url}`"
                :alt="`${project.fields.title} image ${(i as number) + 1}`"
                provider="contentful"
                width="1400"
                class="w-full object-cover mb-2.5"
                loading="lazy"
              />
            </div>
            <aside class="col-span-12 md:col-span-4 md:pl-5 mt-5 md:mt-0">
              <div class="md:sticky md:top-20">
                <div v-if="project.fields.role" class="mb-8">
                  <h3 class="uppercase font-medium text-[#BEBEBE]">About the project</h3>
                  <ContentfulRichText :document="project.fields.role as any" />
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section
          v-if="project.fields.deepDive"
          class="col-span-12 md:col-span-8 mt-16"
        >
          <ContentfulRichText :document="project.fields.deepDive as any" />
        </section>
      </template>

      <!-- VARIANTE collector -->
      <template v-else-if="kind === 'collector'">
        <section
          v-if="project.fields.bodyText"
          class="col-span-12 md:col-start-4 md:col-span-6 mt-16 text-lg md:text-xl text-center"
        >
          <ContentfulRichText :document="project.fields.bodyText as any" />
        </section>

        <CollectorGrid
          v-if="(project.fields.collectorEntries as any[])?.length"
          :entries="project.fields.collectorEntries as any[]"
        />
      </template>

      <!-- VARIANTE gallery -->
      <template v-else-if="kind === 'gallery'">
        <section
          v-if="project.fields.bodyText"
          class="col-span-12 md:col-start-4 md:col-span-6 mt-16 text-lg md:text-xl text-center"
        >
          <ContentfulRichText :document="project.fields.bodyText as any" />
        </section>

        <GallerySection
          v-if="(project.fields.galleryItems as any[])?.length"
          :items="project.fields.galleryItems as any[]"
        />
      </template>

      <!-- SLOT 7: altri progetti -->
      <section
        v-if="(project.fields.relatedProjects as any[])?.length"
        class="col-span-12 mt-16 border-t border-black pt-5"
      >
        <NuxtLink
          v-for="rel in (project.fields.relatedProjects as any[])"
          :key="rel.sys.id"
          :to="`/${rel.fields.slug}`"
          class="mr-5 block md:inline"
        >
          {{ rel.fields.title }}
        </NuxtLink>
      </section>
    </PageGrid>
  </main>
</template>
