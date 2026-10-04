<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === 'en' ? 'it' : 'en'))
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(otherLocale)"
    class="bg-black text-white px-2.5 py-1 rounded-full text-center"
  >
    <span :class="locale === 'en' ? 'opacity-100' : 'opacity-50'">
      {{ locale === 'en' ? 'ENG' : 'ITA' }}
    </span>
    |
    <span :class="otherLocale === 'en' ? 'opacity-100' : 'opacity-50'">
      {{ otherLocale === 'en' ? 'ENG' : 'ITA' }}
    </span>
  </NuxtLink>
</template>