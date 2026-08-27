function vat(amount, rate = 0.15) {
  return amount * rate;
}

const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("1. VAT Calculations:");
console.log("Standard function:", vat(1000));
console.log("Arrow function:", vatArrow(1000));
console.log("---");

function makeCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log("2. Counter Output:");
console.log(counter());
console.log(counter());
console.log(counter());
console.log("---");

const discountBy = (rate) => (price) => price * (1 - rate);

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

const originalPrice = 1000;

console.log("3. Discount Prices for 1000 ETB:");
console.log(`Member Price (10% off): ${memberPrice(originalPrice)} ETB`);
console.log(`Sale Price (30% off): ${salePrice(originalPrice)} ETB`);
console.log("---");

function applyToAll(list, fn) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(fn(list[i]));
  }
  return result;
}

const prices = [100, 250, 500, 1000];
const addVat = (price) => price * 1.15;

const pricesWithVAT = applyToAll(prices, addVat);

console.log("4. Prices with 15% VAT added:");
console.log("Original:", prices);
console.log("With VAT:", pricesWithVAT);
console.log("---");

const cities = ["Addis Ababa", "Hawassa", "Bahir Dar", "Gonder", "Dire Dawa"];

console.log("5. Ethiopian Cities List:");
cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});