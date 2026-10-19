const steps = [
  {
    n: '01',
    title: 'Browse the menu',
    body: 'Filter by category or craving. Tap any dish for the full story, ingredients, and portion size.'
  },
  {
    n: '02',
    title: 'Build your order',
    body: 'Add dishes to your cart, adjust quantities, and check the running total in ETB as you go.'
  },
  {
    n: '03',
    title: 'Checkout & enjoy',
    body: 'Pay securely, track your order in real time, and dig in while it’s still hot.'
  }
]

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">Three steps, <em>warm at your door</em></h2>
        </div>

        <ol className="steps">
          {steps.map((s) => (
            <li key={s.n} className="step">
              <span className="step__num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
