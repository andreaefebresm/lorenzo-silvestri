import { createClient } from 'contentful'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const client = createClient({
  space: config.public.contentful.spaceId,
  accessToken: config.public.contentful.deliveryToken,
  environment: config.public.contentful.environment,
})

  return {
    provide: {
      contentful: client,
    },
  }
})