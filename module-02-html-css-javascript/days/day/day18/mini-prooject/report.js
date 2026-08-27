export const totalByType = (txns, type) =>
  txns
    .filter(t => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const formatReceipts = (txns) =>
  txns.map(
    ({ customer, amount, type }) =>
      `[RECEIPT] Customer: ${customer} | Amount: ${amount} ETB | Type: ${type.toUpperCase()}`
  );

export const updateTransaction = (txns, targetId, updatedFields) =>
  txns.map(txn =>
    txn.id === targetId ? { ...txn, ...updatedFields } : txn
  );