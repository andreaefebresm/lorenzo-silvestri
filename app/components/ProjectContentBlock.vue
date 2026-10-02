<script setup lang="ts">
defineProps<{
  block: any
}>()
</script>

<template>
  <div class="grid grid-cols-12 gap-2.5 mb-16">
    <div class="col-span-12 md:col-span-8">
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

    <aside class="col-span-12 md:col-span-4 md:pl-5 mt-5 md:mt-0">
      <div class="md:sticky md:top-20">
        <h5 v-if="block.fields.title" class="uppercase font-medium text-[#BEBEBE] mb-2">
          {{ block.fields.title }}
        </h5>
        <ContentfulRichText v-if="block.fields.text" :document="block.fields.text as any" />
      </div>
    </aside>
  </div>
</template>