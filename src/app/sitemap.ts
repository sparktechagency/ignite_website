import { MetadataRoute } from 'next'

const baseUrl = 'https://ignitefoundation.us'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes that should be included in the sitemap
  const routes = ['', '/about', '/contact', '/team', '/support', '/donate'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8, // Homepage has higher priority
  }))

  return [...routes]
}
