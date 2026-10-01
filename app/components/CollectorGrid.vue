<script setup lang="ts">
defineProps<{
  entries: any[]
}>()
</script>

<template>
  <section class="col-span-12 mt-16">
    <div class="grid grid-cols-12 gap-2.5">
      <ProjectCard
        v-for="entry in entries.filter((e) => e.fields.project)"
        :key="entry.sys.id"
        :project="entry.fields.project"
        :columns="3"
      />
      <ExternalCard
        v-for="entry in entries.filter((e) => !e.fields.project)"
        :key="entry.sys.id"
        :entry="entry"
        :columns="3"
      />
    </div>
  </section>
</template>
