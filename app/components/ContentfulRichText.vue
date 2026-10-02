<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import type { Document } from '@contentful/rich-text-types'

const props = defineProps<{ document: Document }>()

const html = computed(() => documentToHtmlString(props.document))
</script>

<template>
  <div
    v-html="html"
    class="[&>p]:mb-4 [&>p]:font-light [&_li]:font-light [&_a]:font-light [&_h5]:text-[#BEBEBE] [&_h5]:uppercase [&_h5]:font-medium [&_a]:text-[#767676] [&_a:hover]:text-black [&_a]:transition-colors"
  />
</template>
