export const STORAGE_KEYS = {
  USERS: "walletly_users",
  CURRENT_USER: "walletly_current_user",
  // per-user data — userId se prefix hoga
  ACCOUNTS: (uid) => `walletly_accounts_${uid}`,
  INCOMES: (uid) => `walletly_incomes_${uid}`,
  EXPENSES: (uid) => `walletly_expenses_${uid}`,
  TRANSACTIONS: (uid) => `walletly_transactions_${uid}`,
}

export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    console.error("localStorage save failed")
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    console.error("localStorage remove failed")
  }
}
