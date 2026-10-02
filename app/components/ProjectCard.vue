<script setup lang="ts">
const props = defineProps<{
  project: any
  columns?: number
}>()

const colClass = computed(() => {
  const map: Record<number, string> = {
    3: 'col-span-12 md:col-span-3',
    4: 'col-span-12 md:col-span-4',
    6: 'col-span-12 md:col-span-6',
    12: 'col-span-12',
  }
  return map[props.columns ?? 6] ?? 'col-span-12 md:col-span-6'
})
</script>

<template>
  <div :class="colClass">
    <NuxtLink :to="`/${project.fields.slug}`">
      <NuxtImg
        v-if="project.fields.coverImage"
        :src="`https:${(project.fields.coverImage as any)?.fields?.file?.url}`"
        :alt="project.fields.title as string"
        provider="contentful"
        width="800"
        class="aspect-square object-cover w-full"
        loading="lazy"
      />
      <h2 class="uppercase font-medium text-[20px] text-black mt-2.5">
        {{ project.fields.title }}
      </h2>
      <p v-if="project.fields.year" class="text-[#BEBEBE]">
        {{ project.fields.year }}
      </p>
    </NuxtLink>
  </div>
</template>
