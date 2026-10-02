<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

defineProps<{
  settings?: any
}>()

const otherLocale = computed(() => {
  return locale.value === 'en' ? 'it' : 'en'
})

const currentYear = new Date().getFullYear()
const menuOpen = ref(false)
</script>

<template>
  <PageGrid class="h-14 sticky top-0 bg-white z-50 items-center font-sans text-sm uppercase relative">
    <button
      class="col-span-1 md:hidden"
      aria-label="Menu"
      @click="menuOpen = !menuOpen"
    >
      ☰
    </button>

    <NuxtLink to="/" class="col-span-6 md:col-span-3">
      LORENZO SILVESTRI
    </NuxtLink>

    <span class="hidden md:block md:col-span-1">{{ currentYear }}</span>

    <a
      v-if="settings?.fields.cvFile"
      :href="(settings.fields.cvFile as any)?.fields?.file?.url"
      target="_blank"
      rel="noopener"
      class="hidden md:block md:col-start-10 md:col-span-2 text-left"
    >
      Download CV
    </a>

    <NuxtLink
      :to="switchLocalePath(otherLocale)"
      class="col-start-11 col-span-2 md:col-start-12 md:col-span-1 text-center bg-black text-white px-2.5 py-1 rounded-full inline-block"
    >
      <span :class="locale === 'en' ? 'opacity-100' : 'opacity-50'">
        {{ locale === 'en' ? 'ENG' : 'ITA' }}
      </span>
      |
      <span :class="otherLocale === 'en' ? 'opacity-100' : 'opacity-50'">
        {{ otherLocale === 'en' ? 'ENG' : 'ITA' }}
      </span>
    </NuxtLink>

    <div
      v-if="menuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-white border-b border-black p-5"
    >
        <a
          v-if="settings?.fields.cvFile"
          :href="(settings.fields.cvFile as any)?.fields?.file?.url"
          target="_blank"
          rel="noopener"
          class="block uppercase"
        >
          Download CV
        </a>
    </div>
  </PageGrid>
</template>
