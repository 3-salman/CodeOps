import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="pill">
            <span className="pill__dot"></span>
            Now delivering across Addis Ababa
          </span>

          <h1 className="hero__title">
            Authentic Addis, <em>delivered</em> to your door.
          </h1>

          <p className="hero__lede">
            A curated menu of beloved Ethiopian dishes — from sizzling kitfo to slow-stewed
            shiro. Browse the menu, build your order, and we'll bring it warm.
          </p>

          <div className="hero__ctas">
            <Link className="btn btn--primary btn--lg" href="/menu">Browse the menu</Link>
            <a className="btn btn--ghost btn--lg" href="#specials">Today's specials</a>
          </div>

          <ul className="hero__stats">
            <li><strong>40+</strong><span>local dishes</span></li>
            <li><strong>25 min</strong><span>avg. delivery</span></li>
            <li><strong>4.8★</strong><span>customer rating</span></li>
          </ul>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="plate">
            <div className="plate__inner"></div>
            <div className="plate__ring plate__ring--1" />
            <div className="plate__ring plate__ring--2" />
          </div>
        </div>
      </div>
    </section>
  )
}
