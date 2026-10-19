import { ImageResponse } from 'next/og'

export const alt = 'Addis-Ecommerce - Laptops and Computers in Addis'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// The picture shown when the site link is shared.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#2457e6',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 700 }}>Addis-Ecommerce</div>
        <div style={{ display: 'flex', fontSize: 44, marginTop: 20 }}>
          Laptops and computers in Addis Ababa
        </div>
        <div style={{ display: 'flex', fontSize: 30, marginTop: 40 }}>
          1-year warranty · Delivery in 1–2 days
        </div>
      </div>
    ),
    size
  )
}