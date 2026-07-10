const siteUrl = 'https://zorg.huppietaxi.nl/'

type PageSeoOptions = {
  title: string
  description: string
  path: string
  noindex?: boolean
}

export function usePageSeo({ title, description, path, noindex = false }: PageSeoOptions) {
  const canonicalUrl = `${siteUrl}${path}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonicalUrl,
    twitterTitle: title,
    twitterDescription: description,
    robots: noindex ? 'noindex, nofollow' : 'index, follow'
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }]
  })

  useSchemaOrg([
    defineWebPage({
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: 'nl-NL'
    }),
    defineBreadcrumb({
      itemListElement: [
        { name: 'Home', item: siteUrl },
        { name: title, item: canonicalUrl }
      ]
    })
  ])
}
