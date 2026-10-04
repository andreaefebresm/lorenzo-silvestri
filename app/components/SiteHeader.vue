<script setup lang="ts">
defineProps<{
  settings?: any
  projects?: any[]
}>()

const currentYear = new Date().getFullYear()
const menuOpen = ref(false)

const route = useRoute()
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-white font-sans text-sm uppercase">
    <!-- MOBILE -->
    <div class="md:hidden h-14 px-5 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <button
          :aria-expanded="menuOpen"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo.svg" alt="" class="h-[1em] w-auto" />
          LORENZO SILVESTRI
        </NuxtLink>
      </div>

      <LocaleSwitch />
    </div>

    <nav
      v-if="menuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-white border-b border-black px-5 py-5 max-h-[calc(100vh-56px)] overflow-y-auto"
    >
      <ol class="font-light">
        <li v-for="(project, index) in projects" :key="project.sys.id">
          <NuxtLink :to="`/${project.fields.slug}`">
            {{ index + 1 }}. {{ project.fields.title }}
          </NuxtLink>
        </li>
      </ol>

      <a
        v-if="settings?.fields.cvFile"
        :href="(settings.fields.cvFile as any)?.fields?.file?.url"
        target="_blank"
        rel="noopener"
        class="block mt-5"
      >
        Download CV
      </a>
    </nav>

    <!-- DESKTOP -->
    <div class="hidden md:block">
      <PageGrid class="h-14 items-center">
        <NuxtLink to="/" class="col-span-3 flex items-center gap-2.5">
          <img src="/logo.svg" alt="" class="h-[1em] w-auto" />
          LORENZO SILVESTRI
        </NuxtLink>

        <span class="col-span-1">{{ currentYear }}</span>

        <a
          v-if="settings?.fields.cvFile"
          :href="(settings.fields.cvFile as any)?.fields?.file?.url"
          target="_blank"
          rel="noopener"
          class="col-start-10 col-span-2 text-left"
        >
          Download CV
        </a>

        <LocaleSwitch class="col-start-12 col-span-1" />
      </PageGrid>
    </div>
  </header>
</template>