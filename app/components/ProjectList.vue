<script setup lang="ts">
defineProps<{
  projects?: any[]
  currentSlug?: string | null
}>()
</script>

<template>
  <ol>
    <li v-for="(project, index) in projects" :key="project.sys.id">
        <NuxtLink
          :to="`/${project.fields.slug}`"
          class="transition-colors hover:text-[#2b29c6]"
          :class="project.fields.slug === currentSlug ? 'font-medium' : 'font-light'"
          :aria-current="project.fields.slug === currentSlug ? 'page' : undefined"
        >   {{ index + 1 }}. {{ project.fields.title }}
           </NuxtLink>
    </li>
  </ol>
</template>
