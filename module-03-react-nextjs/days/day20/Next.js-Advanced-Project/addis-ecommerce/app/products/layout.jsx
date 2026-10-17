// This layout wraps BOTH /products and /products/[slug].
// "children" is whichever of those two pages is being shown.
export default function ProductsLayout({ children }) {
  return (
    <div>
      <div className="shop-banner">
        <h2>Laptops and Computers</h2>
        <p>Laptops, gaming laptops, desktops and mini PCs. 1-year warranty on every product.</p>
      </div>

      {children}
    </div>
  )
}