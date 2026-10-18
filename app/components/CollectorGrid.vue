<script setup lang="ts">
defineProps<{
  entries: any[]
}>()
</script>

<template>
  <section class="col-span-12 mt-16">
    <CollectorBlock
      v-for="entry in entries.filter((e) => e?.fields)"
      :key="entry.sys.id"
      :entry="entry"
    />
  </section>
</template>