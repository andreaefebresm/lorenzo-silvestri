<script setup lang="ts">
defineProps<{
  settings: any
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-black text-white">
    <PageGrid class="py-10">
      <div class="col-span-3">
        <p class="font-medium uppercase">Lorenzo Silvestri</p>
        <p class="font-medium">{{ currentYear }}</p>
      </div>

      <div class="col-span-3">
        <h3 class="uppercase font-medium">Location</h3>
        <p v-if="settings?.fields.location" class="font-light">
          {{ settings.fields.location }}
        </p>
      </div>

      <div class="col-span-3">
        <h3 class="uppercase font-medium">Contacts</h3>
        <a
          v-if="settings?.fields.contactEmail"
          :href="`mailto:${settings.fields.contactEmail}`"
          class="font-light block"
        >
          {{ settings.fields.contactEmail }}
        </a>
      </div>

      <div class="col-span-3">
        <h3 class="uppercase font-medium">Social</h3>
        <a
          v-if="settings?.fields.instagramHandle"
          :href="`https://instagram.com/${settings.fields.instagramHandle}`"
          target="_blank"
          rel="noopener"
          class="font-light block"
        >
          Instagram: {{ settings.fields.instagramHandle }}
        </a>
        <p v-if="settings?.fields.linkedinName" class="font-light">
          linkedin: {{ settings.fields.linkedinName }}
        </p>
      </div>

      <div class="col-span-12 mt-16">
        <p class="font-light text-sm">Site by Andrea Elena Febres Medina</p>
      </div>
    </PageGrid>
  </footer>
</template>
