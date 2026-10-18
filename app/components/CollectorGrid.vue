<script setup lang="ts">
defineProps<{
  entries: any[]
  title?: string
}>()
</script>

<template>
  <section class="col-span-12 mt-16">
    <div v-if="title" class="mb-5">
      <h2 class="uppercase font-medium text-xl text-[#BEBEBE] mb-2.5">{{ title }}</h2>
      <div class="border-t border-black"></div>
    </div>

    <CollectorBlock
      v-for="entry in entries.filter((e) => e?.fields)"
      :key="entry.sys.id"
      :entry="entry"
    />
  </section>
</template>