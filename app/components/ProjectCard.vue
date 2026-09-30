<script setup lang="ts">
defineProps<{
  project: any
}>()
</script>

<template>
  <NuxtLink :to="`/${project.fields.slug}`">
    <NuxtImg
      v-if="project.fields.coverImage"
      :src="`https:${(project.fields.coverImage as any)?.fields?.file?.url}`"
      :alt="project.fields.title as string"
      provider="contentful"
      width="800"
      class="aspect-[3/4] object-cover w-full"
      loading="lazy"
    />
    <h2 class="uppercase font-medium text-[20px] text-black mt-2.5">
      {{ project.fields.title }}
    </h2>
    <p v-if="project.fields.year" class="text-[#BEBEBE]">
      {{ project.fields.year }}
    </p>
  </NuxtLink>
</template>
