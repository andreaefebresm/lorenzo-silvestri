<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => {
  return locale.value === 'en' ? 'it' : 'en'
})

const currentYear = new Date().getFullYear()
</script>

<template>
<PageGrid class=" h-14 sticky top-0 bg-white z-50 items-center font-sans text-sm uppercase">
        <NuxtLink to="/" class="col-span-3">
      LORENZO SILVESTRI
    </NuxtLink>

    <span class="col-span-1">{{ currentYear }}</span>

    <a href="#" class="col-start-10 col-span-2 text-left">
      DOWNLOAD CV
    </a>

    <NuxtLink
  :to="switchLocalePath(otherLocale)"
  class="col-start-12 col-span-1 text-center bg-black text-white px-2.5 py-1 rounded-full inline-block"
>
  <span :class="locale === 'en' ? 'opacity-100' : 'opacity-50'">
    {{ locale === 'en' ? 'ENG' : 'ITA' }}
  </span>
  |
  <span :class="otherLocale === 'en' ? 'opacity-100' : 'opacity-50'">
    {{ otherLocale === 'en' ? 'ENG' : 'ITA' }}
  </span>
</NuxtLink>
  </PageGrid>
</template>
