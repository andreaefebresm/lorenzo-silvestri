<script setup lang="ts">
defineProps<{
  items: any[]
}>()
</script>

<template>
  <section class="col-span-12 mt-16">
    <div class="grid grid-cols-12 gap-2.5">
      <div
        v-for="item in items"
        :key="item.sys.id"
        class="col-span-3"
      >
        <component
          :is="item.fields.internalLink ? 'NuxtLink' : (item.fields.externalUrl ? 'a' : 'div')"
          :to="item.fields.internalLink ? `/${(item.fields.internalLink as any)?.fields?.slug}` : undefined"
          :href="item.fields.externalUrl || undefined"
          :target="item.fields.externalUrl ? '_blank' : undefined"
          :rel="item.fields.externalUrl ? 'noopener' : undefined"
        >
          <NuxtImg
            v-if="item.fields.image"
            :src="`https:${(item.fields.image as any)?.fields?.file?.url}`"
            :alt="item.fields.title as string"
            provider="contentful"
            width="600"
            class="aspect-[3/4] object-cover w-full"
            loading="lazy"
          />
          <h3 class="uppercase font-medium mt-2.5">{{ item.fields.title }}</h3>
          <p v-if="item.fields.status" class="text-[#BEBEBE] uppercase">
            {{ item.fields.status }}
          </p>
        </component>
      </div>
    </div>
  </section>
</template>