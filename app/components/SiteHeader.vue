<script setup lang="ts">
defineProps<{
  settings?: any
  projects?: any[]
  current?: { slug: string; number: number | null; title: string } | null
}>()

const currentYear = new Date().getFullYear()
const menuOpen = ref(false)
const dropdownOpen = ref(false)

let closeTimer: ReturnType<typeof setTimeout> | null = null

function openDropdown() {
  if (closeTimer) clearTimeout(closeTimer)
  dropdownOpen.value = true
}

function scheduleClose() {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    dropdownOpen.value = false
  }, 150)
}

const route = useRoute()
watch(() => route.fullPath, () => {
  menuOpen.value = false
  dropdownOpen.value = false
})

onBeforeUnmount(() => {
  if (closeTimer) clearTimeout(closeTimer)
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
      class="md:hidden absolute top-full left-0 w-full bg-white border-b border-black px-5 py-5 max-h-[calc(100vh-56px)] overflow-y-auto normal-case"
    >
      <ProjectList :projects="projects" :current-slug="current?.slug" />

      <a
        v-if="settings?.fields.cvFile"
        :href="(settings.fields.cvFile as any)?.fields?.file?.url"
        target="_blank"
        rel="noopener"
        class="block mt-5 uppercase"
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

        <div
          v-if="current"
          class="col-start-6 col-span-4 self-stretch relative flex items-center"
          @mouseenter="openDropdown"
          @mouseleave="scheduleClose"
          @focusin="openDropdown"
          @focusout="scheduleClose"
          @keydown.esc="dropdownOpen = false"
        >
          <button
            type="button"
            class="uppercase"
            aria-haspopup="true"
            :aria-expanded="dropdownOpen"
            @click="dropdownOpen = !dropdownOpen"
          >
            <span>
              Works •
              <template v-if="current.number">{{ current.number }}.</template>
              {{ current.title }}
            </span>
            <span aria-hidden="true" class="ml-1">▾</span>
          </button>

          <div
            v-if="dropdownOpen"
            class="absolute top-full left-0 min-w-[16rem] max-h-[calc(100vh-56px)] overflow-y-auto bg-white border-t-0 px-5 py-5 normal-case"
          >
            <ProjectList :projects="projects" :current-slug="current.slug" />
          </div>
        </div>

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
