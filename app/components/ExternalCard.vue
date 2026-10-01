<script setup lang="ts">
const props = defineProps<{
  entry: any
  columns?: number
}>()

const colClass = computed(() => {
  const map: Record<number, string> = {
    3: 'col-span-3',
    4: 'col-span-4',
    6: 'col-span-6',
    12: 'col-span-12',
  }
  return map[props.columns ?? 3] ?? 'col-span-3'
})
</script>

<template>
  <div :class="colClass">
    <a
      :href="entry.fields.externalUrl"
      target="_blank"
      rel="noopener"
    >
      <NuxtImg
        v-if="entry.fields.externalImage"
        :src="`https:${(entry.fields.externalImage as any)?.fields?.file?.url}`"
        :alt="entry.fields.externalTitle as string"
        provider="contentful"
        width="600"
        class="aspect-[3/4] object-cover w-full"
        loading="lazy"
      />
      <h3 class="uppercase font-medium mt-2.5">{{ entry.fields.externalTitle }}</h3>
      <p v-if="entry.fields.status" class="text-[#BEBEBE] uppercase">
        {{ entry.fields.status }}
      </p>
    </a>
  </div>
</template>
