import { getProducts } from '@/lib/db'
import { SITE_URL } from '@/lib/site'

// Served at /sitemap.xml. Only PUBLIC pages are listed - no cart, checkout or orders.
export default async function sitemap() {
  const products = await getProducts()

  const pages = ['', '/products', '/about'].map((path) => ({
    url: SITE_URL + path,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))

  const productPages = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...pages, ...productPages]
}