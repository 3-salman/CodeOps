export default function Footer() {
  return (
    <footer className="foot">
      <div className="container foot__inner">
        <div className="foot__brand">
          <a className="brand" href="#">
            <span className="brand__dot"></span>
            <span className="brand__name">
              Addis<span className="brand__name-accent">Eats</span>
            </span>
          </a>
          <p>Authentic Ethiopian food, from local kitchens to your table.</p>
        </div>

        <div className="foot__cols">
          <div>
            <h4>Explore</h4>
            <a href="#">Menu</a>
            <a href="#">Specials</a>
            <a href="#">New arrivals</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Partner with us</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Help center</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
      <div className="foot__bar">
        <span>© 2026 Addis Eats · Made with ☕ in Addis Ababa</span>
      </div>
    </footer>
  )
}
