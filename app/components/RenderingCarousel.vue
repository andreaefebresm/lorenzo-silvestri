<script setup lang="ts">
const props = defineProps<{
  images: any[]
}>()

const current = ref(0)

function goTo(index: number) {
  current.value = index
}

let touchStartX = 0

function onTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  if (!touch) return
  touchStartX = touch.clientX
}

function onTouchEnd(e: TouchEvent) {
  const touch = e.changedTouches[0]
  if (!touch) return
  const diff = touch.clientX - touchStartX
  if (Math.abs(diff) < 50) return
  if (diff < 0 && current.value < props.images.length - 1) {
    current.value++
  } else if (diff > 0 && current.value > 0) {
    current.value--
  }
}
</script>

<template>
  <div>
    <div
      class="aspect-square overflow-hidden"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <NuxtImg
        :src="`https:${(images[current] as any)?.fields?.file?.url}`"
        :alt="`Image ${current + 1}`"
        provider="contentful"
        width="1000"
        class="w-full h-full object-cover"
      />
    </div>

    <div v-if="images.length > 1" class="flex justify-center gap-2 mt-2.5">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="w-2 h-2 rounded-full"
        :class="i === current ? 'bg-black' : 'bg-[#BEBEBE]'"
        :aria-label="`Go to image ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
