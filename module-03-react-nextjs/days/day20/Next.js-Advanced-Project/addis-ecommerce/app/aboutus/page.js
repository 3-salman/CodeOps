import Link from 'next/link'

export const metadata = {
  title: 'About us',
  description: 'VoltMart sells laptops, gaming laptops, desktops and mini PCs in Addis Ababa.',
}

const reasons = [
  { title: 'Genuine products', text: 'Every laptop and computer comes from the brand or an authorised supplier.' },
  { title: '1-year warranty', text: 'Every product is covered for one year. If it fails, we repair or replace it.' },
  { title: 'Fast delivery', text: 'We deliver across Addis Ababa in 1–2 days.' },
  { title: '7-day returns', text: 'If an item is faulty when it arrives, you can return it within 7 days.' },
]

export default function AboutPage() {
  return (
    <div>
      <h1>About us</h1>

      <div className="section-box">
        <h2>Who we are</h2>
        <p>
          VoltMart is an online shop for laptops and computers in Addis Ababa. We started with one
          idea: buying a computer should be simple. You should see the real specifications, a clear
          price in birr, and get a product that works.
        </p>
        <p>
          Today we sell laptops, gaming laptops, desktops, all-in-one computers and mini PCs from
          brands like Lenovo, HP, Dell, ASUS, Acer, Apple and MSI. We also build our own desktops
          for gaming and office use.
        </p>
      </div>

      <div className="section-box">
        <h2>Why choose VoltMart</h2>
        <div className="reasons">
          {reasons.map((r) => (
            <div className="reason" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-box">
        <h2>Visit or contact us</h2>
        <ul className="info-list">
          <li>Address: Bole, Addis Ababa</li>
          <li>Phone: +251 900 000 000</li>
          <li>Email: support@voltmart.example</li>
          <li>Open: Monday to Saturday, 9:00 – 18:00</li>
        </ul>
      </div>

      <p style={{ marginTop: 20 }}>
        <Link href="/products" className="btn">Browse products</Link>
      </p>
    </div>
  )
}