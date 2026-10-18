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
          class="group absolute inset-y-0 left-0 w-1/2 flex items-center justify-start pl-4 cursor-pointer"
          aria-label="Previous image"
          @click="onPrev"
        >
          <svg
            class="h-8 w-auto text-white drop-shadow-md transition-all duration-200 group-hover:text-[#2b29c6] group-hover:scale-110"
            viewBox="0 0 13 30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.78135 0.263494L2.02619 6.01865C0.728845 7.31598 2.08198e-05 9.07552 1.58592e-06 10.9102L9.53796e-07 18.1409C3.7354e-06 19.0493 0.178923 19.9489 0.526582 20.7882C0.874241 21.6275 1.3838 22.3901 2.02619 23.0325L7.78135 28.7877C7.95 28.9563 8.17875 29.051 8.41726 29.051C8.65577 29.051 8.88452 28.9563 9.05317 28.7877L12.4403 25.4005C12.5238 25.317 12.5901 25.2179 12.6353 25.1088C12.6805 24.9996 12.7037 24.8827 12.7037 24.7646C12.7037 24.6465 12.6805 24.5295 12.6353 24.4204C12.5901 24.3113 12.5238 24.2122 12.4403 24.1287L4.01121 15.6996C3.69986 15.3882 3.52495 14.9659 3.52496 14.5256C3.52497 14.0853 3.69991 13.6629 4.01127 13.3516L12.4403 4.92247C12.5238 4.83896 12.5901 4.73982 12.6353 4.6307C12.6805 4.52159 12.7037 4.40466 12.7037 4.28656C12.7037 4.16845 12.6805 4.05153 12.6353 3.94242C12.5901 3.8333 12.5238 3.73416 12.4403 3.65064L9.05318 0.263494C8.88452 0.0948426 8.65578 8.35695e-05 8.41726 8.35486e-05C8.17875 8.35278e-05 7.95 0.0948425 7.78135 0.263494Z" />
          </svg>
        </button>

        <button
          class="group absolute inset-y-0 right-0 w-1/2 flex items-center justify-end pr-4 cursor-pointer"
          aria-label="Next image"
          @click="onNext"
        >
          <svg
            class="h-8 w-auto text-white drop-shadow-md -scale-x-100 transition-all duration-200 group-hover:text-[#2b29c6] group-hover:-scale-x-110 group-hover:scale-y-110"
            viewBox="0 0 13 30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.78135 0.263494L2.02619 6.01865C0.728845 7.31598 2.08198e-05 9.07552 1.58592e-06 10.9102L9.53796e-07 18.1409C3.7354e-06 19.0493 0.178923 19.9489 0.526582 20.7882C0.874241 21.6275 1.3838 22.3901 2.02619 23.0325L7.78135 28.7877C7.95 28.9563 8.17875 29.051 8.41726 29.051C8.65577 29.051 8.88452 28.9563 9.05317 28.7877L12.4403 25.4005C12.5238 25.317 12.5901 25.2179 12.6353 25.1088C12.6805 24.9996 12.7037 24.8827 12.7037 24.7646C12.7037 24.6465 12.6805 24.5295 12.6353 24.4204C12.5901 24.3113 12.5238 24.2122 12.4403 24.1287L4.01121 15.6996C3.69986 15.3882 3.52495 14.9659 3.52496 14.5256C3.52497 14.0853 3.69991 13.6629 4.01127 13.3516L12.4403 4.92247C12.5238 4.83896 12.5901 4.73982 12.6353 4.6307C12.6805 4.52159 12.7037 4.40466 12.7037 4.28656C12.7037 4.16845 12.6805 4.05153 12.6353 3.94242C12.5901 3.8333 12.5238 3.73416 12.4403 3.65064L9.05318 0.263494C8.88452 0.0948426 8.65578 8.35695e-05 8.41726 8.35486e-05C8.17875 8.35278e-05 7.95 0.0948425 7.78135 0.263494Z" />
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