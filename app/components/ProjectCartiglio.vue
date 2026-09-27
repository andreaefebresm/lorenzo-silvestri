<script setup lang="ts">
interface CartiglioProps {
  year?: string
  scope?: string
  client?: string
  credits?: string[]
}

const props = defineProps<CartiglioProps>()

const { locale } = useI18n()

const labels = computed(() => {
  const dict = {
    en: { year: 'Year', scope: 'Scope', client: 'Client', credits: 'Credits' },
    it: { year: 'Anno', scope: 'Ambito', client: 'Cliente', credits: 'Crediti' },
  }
  return dict[locale.value as 'en' | 'it'] ?? dict.en
})

// Ogni riga: sparisce se il valore è assente, stringa vuota, o array vuoto
const rows = computed(() => {
  const list: { label: string; value: string }[] = []

  if (props.year) list.push({ label: labels.value.year, value: props.year })
  if (props.scope) list.push({ label: labels.value.scope, value: props.scope })
  if (props.client) list.push({ label: labels.value.client, value: props.client })
  if (props.credits && props.credits.length > 0) {
    list.push({ label: labels.value.credits, value: props.credits.join(', ') })
  }

  return list
})
</script>

<template>
  <dl v-if="rows.length > 0" class="cartiglio">
    <div v-for="row in rows" :key="row.label" class="cartiglio__row">
      <dt class="cartiglio__label">{{ row.label }}</dt>
      <dd class="cartiglio__value">{{ row.value }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.cartiglio {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.875rem;
}

.cartiglio__row {
  display: flex;
  gap: 1rem;
}

.cartiglio__label {
  text-transform: uppercase;
  opacity: 0.6;
  min-width: 6rem;
}

.cartiglio__value {
  margin: 0;
}
</style>