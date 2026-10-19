// Prices in the menu are in ETB (Ethiopian Birr), so the cart totals are too.
// Change DELIVERY_FEE here and every screen picks it up.
export const DELIVERY_FEE = 50

export function formatETB(amount) {
  return `${Number(amount).toFixed(2)} ETB`
}

export function cartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
}
