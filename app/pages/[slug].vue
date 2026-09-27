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
  }),
  { watch: [contentfulLocale] }
)

const project = computed(() => result.value?.items?.[0])

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}
</script>

<template>
  <main v-if="project">
    <PageGrid>
      <!-- SLOT 1: cover + cartiglio affiancati -->
      <div class="col-span-7">
        <NuxtImg
          v-if="project.fields.coverImage"
          :src="`https:${(project.fields.coverImage as any)?.fields?.file?.url}`"
          :alt="project.fields.title as string"
          provider="contentful"
          width="1400"
          class="w-full object-cover"
        />
        <h1 class="text-5xl font-semibold mt-5">{{ project.fields.title }}</h1>
        <p v-if="project.fields.tagline" class="text-[#BEBEBE] text-3xl  font-semibold mt-2">
        {{ project.fields.tagline }}
        </p>
      </div>

      <aside class="col-start-9 col-span-4 pl-5">
        <div v-if="project.fields.scope" class="mb-8">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Scope</h3>
          <p class="font-light">{{ project.fields.scope }}</p>
        </div>

        <div v-if="project.fields.client" class="mb-8">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Client</h3>
          <p class="font-light">{{ project.fields.client }}</p>
        </div>

        <div v-if="(project.fields.credits as string[])?.length" class="mb-8">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Credits</h3>
          <p v-for="c in (project.fields.credits as string[])" :key="c" class="font-light">{{ c }}</p>
        </div>

        <div v-if="project.fields.year" class="mb-8">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Year</h3>
          <p class="font-light">{{ project.fields.year }}</p>
        </div>

        <div v-if="project.fields.featured" class="mb-8">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Featured</h3>
          <ContentfulRichText :document="project.fields.featured as any" />
        </div>
      </aside>

      <!-- SLOT 3: body text narrativo, centrato e più stretto -->
      <section
        v-if="project.fields.bodyText"
        class="col-start-2 col-span-10 font-light mt-16 text-center text-3xl"
      >
        <ContentfulRichText :document="project.fields.bodyText as any" />
      </section>

      <!-- SLOT 2 + SLOT 4: gallery a sinistra, testo ruolo sticky a destra -->
      <div class="col-span-7 mt-16">
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

      <aside class="col-start-9 col-span-4 pl-5 mt-16">
        <div class="sticky top-8">
          <div v-if="project.fields.role" class="mb-8">
            <h3 class="uppercase font-medium text-[#BEBEBE]">About the project</h3>
            <ContentfulRichText :document="project.fields.role as any" />
          </div>
        </div>
      </aside>

      <!-- SLOT 6: deep dive tecnico -->
      <section
        v-if="project.fields.deepDive"
        class="col-span-8 mt-16"
      >
        <ContentfulRichText :document="project.fields.deepDive as any" />
      </section>

      <!-- SLOT 7: altri progetti -->
      <section
        v-if="(project.fields.relatedProjects as any[])?.length"
        class="col-span-12 mt-16 border-t border-black pt-5"
      >
        <NuxtLink
          v-for="rel in (project.fields.relatedProjects as any[])"
          :key="rel.sys.id"
          :to="`/${rel.fields.slug}`"
          class="mr-5"
        >
          {{ rel.fields.title }}
        </NuxtLink>
      </section>
    </PageGrid>
  </main>
</template>

<style scoped>
h5 {
  font-size: 3rem;
  font-weight: 500;
}
</style>