// Flat delivery fee in ETB. Used by the cart page and when an order is created.
export const DELIVERY_FEE = 300

export function money(amount) {
  return amount.toLocaleString('en-US') + ' ETB'
}