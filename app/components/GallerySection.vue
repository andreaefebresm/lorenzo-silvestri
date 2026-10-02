<script setup lang="ts">
defineProps<{
  items: any[]
}>()
</script>

<template>
  <section class="col-span-12 mt-16">
    <div
      v-for="item in items"
      :key="item.sys.id"
      class="grid grid-cols-12 gap-2.5 mb-16"
    >
      <div class="col-span-12 md:col-span-8">
        <RenderingCarousel :images="(item.fields.images as any[]) ?? []" />
      </div>

      <div class="col-span-12 md:col-span-4 md:pl-5 mt-5 md:mt-0">
        <div v-if="item.fields.scope" class="mb-4">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Scope</h3>
          <p class="font-light">{{ item.fields.scope }}</p>
        </div>
        <div v-if="item.fields.client">
          <h3 class="uppercase font-medium text-[#BEBEBE]">Client</h3>
          <p class="font-light">{{ item.fields.client }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
