import { ImageResponse } from 'next/og'
import { getProductBySlug } from '@/lib/db'

export const alt = 'Addis-Ecommerce product'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// The picture shown when a product link is shared: name, price and brand.
export default async function Image({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  const name = product ? product.name : 'Addis-Ecommerce'
  const price = product ? product.price.toLocaleString('en-US') + ' ETB' : ''
  const line = product ? product.brand + ' · ' + product.category : 'Laptops and computers'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 70,
          background: '#ffffff',
          color: '#1a1a1a',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#2457e6' }}>Addis-Ecommerce</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 34, color: '#666666' }}>{line}</div>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, marginTop: 10 }}>{name}</div>
          <div style={{ display: 'flex', fontSize: 70, fontWeight: 700, color: '#2457e6', marginTop: 20 }}>
            {price}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#666666' }}>
          1-year warranty · Delivery in Addis Ababa
        </div>
      </div>
    ),
    size
  )
}