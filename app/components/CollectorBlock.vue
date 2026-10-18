<script setup lang="ts">
const props = defineProps<{
  entry: any
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

const MAX_IMAGES = 6
const pill = 'bg-black text-white px-2.5 py-1 rounded-full text-sm uppercase transition-colors hover:bg-accent'

const labels = computed(() =>
  locale.value === 'it'
    ? { project: 'Vedi il progetto', site: 'Visita il sito', scope: 'Ambito', client: 'Cliente', year: 'Anno' }
    : { project: 'View project', site: 'Visit website', scope: 'Scope', client: 'Client', year: 'Year' }
)

const own = computed(() => props.entry.fields ?? {})
const linked = computed(() => props.entry.fields?.project?.fields ?? {})

const title = computed(() => own.value.title || linked.value.title)
const tagline = computed(() => own.value.tagline || linked.value.tagline)
const scope = computed(() => own.value.scope || linked.value.scope)
const client = computed(() => own.value.client || linked.value.client)
const year = computed(() => own.value.year || linked.value.year)

const projectSlug = computed(() => linked.value.slug as string | undefined)

const externalHref = computed(() => {
  const url = (own.value.externalUrl as string | undefined)?.trim()
  if (!url) return undefined
  return /^(https?:|mailto:)/i.test(url) ? url : `https://${url}`
})

const images = computed(() => {
  const ownImages = ((own.value.images as any[] | undefined) ?? []).filter((a) => a?.fields?.file)
  if (ownImages.length) return ownImages

  const out: any[] = []
  const seen = new Set<string>()
  const add = (a: any) => {
    if (!a?.fields?.file || seen.has(a.sys.id)) return
    seen.add(a.sys.id)
    out.push(a)
  }

  // l'hero (o la cover) è sempre la prima immagine
  add(linked.value.heroImage ?? linked.value.coverImage)

  const blocks = (linked.value.contentBlocks as any[] | undefined) ?? []
  const rest = blocks.length
    ? blocks.flatMap((b) => (b?.fields?.images as any[]) ?? [])
    : ((linked.value.gallery as any[]) ?? [])
  rest.forEach(add)

  return out.slice(0, MAX_IMAGES)
})
</script>

<template>
  <div class="grid grid-cols-12 gap-2.5 mb-16">
    <div class="col-span-12 md:col-span-8">
      <RenderingCarousel v-if="images.length" :images="images" />
      <h2 v-if="title" class="text-2xl md:text-4xl font-semibold mt-5">{{ title }}</h2>
      <p v-if="tagline" class="text-[#BEBEBE] text-lg md:text-2xl font-semibold">
        {{ tagline }}
      </p>
    </div>

    <aside class="col-span-12 md:col-start-9 md:col-span-4 md:pl-5 mt-5 md:mt-0">
      <div v-if="scope" class="mb-8">
        <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">{{ labels.scope }}</h3>
        <p class="text-sm font-light">{{ scope }}</p>
      </div>
      <div v-if="client" class="mb-8">
        <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">{{ labels.client }}</h3>
        <p class="text-sm font-light">{{ client }}</p>
      </div>
      <div v-if="year" class="mb-8">
        <h3 class="uppercase font-medium text-xl text-[#BEBEBE]">{{ labels.year }}</h3>
        <p class="text-sm font-light">{{ year }}</p>
      </div>

      <div v-if="projectSlug || externalHref" class="flex flex-wrap gap-2.5">
        <NuxtLink v-if="projectSlug" :to="localePath(`/${projectSlug}`)" :class="pill">
          {{ labels.project }}
        </NuxtLink>
        <a v-if="externalHref" :href="externalHref" target="_blank" rel="noopener" :class="pill">
          {{ labels.site }}
        </a>
      </div>
    </aside>
  </div>
</template>