



const prices = [200, 500, 800, 1200, 1500];

const total = prices
  .map(price => price * 1.15)
  .filter(price => price < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log("1. Total under 1000 ETB with VAT:", total);



// 2. Object Iteration with Object.entries

const customer = {
  name: "Abebe",
  city: "Addis Ababa",
  balance: 2500
};

console.log("\n2. Customer Properties:");
for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}



// 3. Object & Parameter Destructuring

const { name, city } = customer;

function greet({ name }) {
  return `Hello, ${name}!`;
}

console.log("\n3. Destructuring & Greeting:");
console.log(`Extracted: ${name} from ${city}`);
console.log(greet(customer));



// 4. Immutable Object Updates with Spread Syntax

const updatedCustomer = {
  ...customer,
  city: "Hawassa",
  phone: "+251911123456"
};

console.log("\n4. Immutable Update Check:");
console.log("Original Customer:", customer);
console.log("Updated Customer:", updatedCustomer);


// ------------------------------------------
// 5. ES Modules Setup
// ------------------------------------------
/*
Save the following two blocks as separate files in your project directory.
Ensure your package.json has `"type": "module"` set if running via Node.js.
*/

// --- File: money.js ---
/*
export const VAT = 0.15;

export function addVat(amount) {
  return amount * (1 + VAT);
}
*/

// --- File: app.js ---
/*
import { addVat, VAT } from './money.js';

console.log(`VAT Rate: ${VAT * 100}%`);
console.log(`100 ETB with VAT: ${addVat(100)}`);
*/