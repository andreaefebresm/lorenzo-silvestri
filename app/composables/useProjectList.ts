export const useProjectsList = () => {
  const { $contentful } = useNuxtApp()
  const { contentfulLocale } = useContentfulLocale()

  return useAsyncData(
    'projects-list',
    () => $contentful.getEntries({
      content_type: 'project',
      locale: contentfulLocale.value,
      'fields.published': true,
      order: ['fields.order'],
    }),
    { watch: [contentfulLocale] }
  )
}