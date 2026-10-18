<script setup lang="ts">
defineProps<{
  projects?: any[]
  currentSlug?: string | null
  subItems?: { parentSlug: string; items: { slug: string; title: string }[] } | null
}>()

const localePath = useLocalePath()
</script>

<template>
  <ol>
    <li v-for="(project, index) in projects" :key="project.sys.id">
      <NuxtLink
        :to="localePath(`/${project.fields.slug}`)"
        class="transition-colors hover:text-[#2b29c6]"
        :class="project.fields.slug === currentSlug ? 'font-medium' : 'font-light'"
        :aria-current="project.fields.slug === currentSlug ? 'page' : undefined"
      >
        {{ index + 1 }}. {{ project.fields.title }}
      </NuxtLink>

      <ol
        v-if="subItems && subItems.parentSlug === project.fields.slug"
        class="pl-4"
      >
        <li v-for="(sub, i) in subItems.items" :key="sub.slug">
          <NuxtLink
            :to="localePath(`/${sub.slug}`)"
            class="transition-colors hover:text-[#2b29c6]"
            :class="sub.slug === currentSlug ? 'font-medium' : 'font-light'"
            :aria-current="sub.slug === currentSlug ? 'page' : undefined"
          >
            {{ index + 1 }}.{{ i + 1 }} {{ sub.title }}
          </NuxtLink>
        </li>
      </ol>
    </li>
  </ol>
</template>