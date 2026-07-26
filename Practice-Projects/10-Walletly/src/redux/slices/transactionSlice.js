import { createSlice } from "@reduxjs/toolkit"

export const PAYMENT_METHODS = ["Cash", "UPI", "Debit Card", "Credit Card", "Net Banking"]

const initialState = {
  transactions: [],
}

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // latest pehle dikhega
      state.transactions.unshift(action.payload)
    },

    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) state.transactions[index] = action.payload
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload)
    },

    // localStorage se load
    setTransactions: (state, action) => {
      state.transactions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase("auth/logout", () => initialState)
  },
})

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setTransactions,
} = transactionSlice.actions

// selectors
export const selectAllTransactions = (state) => state.transaction.transactions

// recent 5 transactions
export const selectRecentTransactions = (state) =>
  state.transaction.transactions.slice(0, 5)

export default transactionSlice.reducer
