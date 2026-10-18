<script setup lang="ts">
const props = defineProps<{
  images: any[]
}>()

const AUTOPLAY_MS = 4000

const current = ref(0)
const total = computed(() => props.images.length)

let timer: ReturnType<typeof setInterval> | null = null

function next() {
  if (total.value < 2) return
  current.value = (current.value + 1) % total.value
}

function prev() {
  if (total.value < 2) return
  current.value = (current.value - 1 + total.value) % total.value
}

function goTo(index: number) {
  current.value = index
  start()
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function start() {
  stop()
  if (total.value < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(next, AUTOPLAY_MS)
}

function onPrev() {
  prev()
  start()
}

function onNext() {
  next()
  start()
}

let touchStartX = 0

function onTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  if (!touch) return
  touchStartX = touch.clientX
  stop()
}

function onTouchEnd(e: TouchEvent) {
  const touch = e.changedTouches[0]
  if (touch) {
    const diff = touch.clientX - touchStartX
    if (Math.abs(diff) >= 50) {
      if (diff < 0) next()
      else prev()
    }
  }
  start()
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div>
    <div
      class="relative aspect-[813/516] overflow-hidden"
      @mouseenter="stop"
      @mouseleave="start"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <NuxtImg
        v-for="(img, i) in images"
        :key="i"
        :src="`https:${(img as any)?.fields?.file?.url}`"
        :alt="`Image ${i + 1}`"
        provider="contentful"
        width="1000"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        :class="i === current ? 'opacity-100' : 'opacity-0'"
        :loading="i === 0 ? 'eager' : 'lazy'"
      />

      <template v-if="total > 1">
        <button
          class="absolute inset-y-0 left-0 w-1/2 flex items-center justify-start pl-4 cursor-pointer"
          aria-label="Previous image"
          @click="onPrev"
        >
          <svg
            class="w-10 h-10 text-black -scale-x-100"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            aria-hidden="true"
          >
            <path d="M3 16H22M14 6L24 16L14 26" />
          </svg>
        </button>

        <button
          class="absolute inset-y-0 right-0 w-1/2 flex items-center justify-end pr-4 cursor-pointer"
          aria-label="Next image"
          @click="onNext"
        >
          <svg
            class="w-10 h-10 text-black"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            aria-hidden="true"
          >
            <path d="M3 16H22M14 6L24 16L14 26" />
          </svg>
        </button>
      </template>
    </div>

    <div v-if="total > 1" class="flex justify-center gap-2 mt-2.5">
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
