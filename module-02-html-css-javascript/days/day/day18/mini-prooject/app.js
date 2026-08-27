import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, updateTransaction } from "./report.js";

console.log("=== TELEBIRR TRANSACTION REPORT ===");

const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits:  ${totalDebits} ETB`);
console.log(`Net Balance:   ${totalCredits - totalDebits} ETB`);

console.log("\n=== FORMATTED RECEIPTS ===");
const receipts = formatReceipts(transactions);
receipts.forEach(receipt => console.log(receipt));

console.log("\n=== IMMUTABLE TRANSACTION UPDATE ===");
const updatedTransactions = updateTransaction(transactions, 1, { amount: 300 });

console.log("Original Txn #1 Amount:", transactions[0].amount, "ETB");
console.log("Updated  Txn #1 Amount:", updatedTransactions[0].amount, "ETB");