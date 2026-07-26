// keys — ek jagah define karo, galti na ho
export const STORAGE_KEYS = {
  ACCOUNTS: "walletly_accounts",
  INCOMES: "walletly_incomes",
  EXPENSES: "walletly_expenses",
  TRANSACTIONS: "walletly_transactions",
}

// localStorage se data nikalo
export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// localStorage mein save karo
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    console.error("localStorage save failed")
  }
}
