export const useContentfulLocale = () => {
  const { locale } = useI18n()

  const contentfulLocale = computed(() => {
    return locale.value === 'it' ? 'it' : 'en-US'
  })

  return { contentfulLocale }
}