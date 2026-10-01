<script setup lang="ts">
defineProps<{
  block: any
}>()
</script>

<template>
  <div class="grid grid-cols-12 gap-2.5 mb-16">
    <div class="col-span-8">
      <NuxtImg
        v-for="(img, i) in (block.fields.images as any[]) ?? []"
        :key="i"
        :src="`https:${img.fields.file.url}`"
        :alt="`Image ${(i as number) + 1}`"
        provider="contentful"
        width="1400"
        class="w-full object-cover mb-2.5"
        loading="lazy"
      />
    </div>

    <aside class="col-span-4 pl-5">
      <div class="sticky top-20">
        <ContentfulRichText v-if="block.fields.text" :document="block.fields.text as any" />
      </div>
    </aside>
  </div>
</template>
