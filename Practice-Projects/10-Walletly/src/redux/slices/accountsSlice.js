import { createSlice } from "@reduxjs/toolkit"

export const ACCOUNT_TYPES = ["Bank Account", "Wallet", "Cash", "Credit Card", "Savings"]

const initialState = { accounts: [] }

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => { state.accounts.push(action.payload) },
    updateAccount: (state, action) => {
      const index = state.accounts.findIndex((a) => a.id === action.payload.id)
      if (index !== -1) state.accounts[index] = action.payload
    },
    deleteAccount: (state, action) => {
      state.accounts = state.accounts.filter((a) => a.id !== action.payload)
    },
    toggleAccountStatus: (state, action) => {
      const account = state.accounts.find((a) => a.id === action.payload)
      if (account) account.isActive = !account.isActive
    },
    updateAccountBalance: (state, action) => {
      const { accountId, amount, type } = action.payload
      const account = state.accounts.find((a) => a.id === accountId)
      if (account) {
        if (type === "income") account.currentBalance += amount
        if (type === "expense") account.currentBalance -= amount
      }
    },
    setAccounts: (state, action) => { state.accounts = action.payload },
  },
  // logout pe reset
  extraReducers: (builder) => {
    builder.addCase("auth/logout", () => initialState)
  },
})

export const { addAccount, updateAccount, deleteAccount, toggleAccountStatus, updateAccountBalance, setAccounts } = accountsSlice.actions

export const selectAllAccounts = (state) => state.accounts.accounts
export const selectActiveAccounts = (state) => state.accounts.accounts.filter((a) => a.isActive)
export const selectTotalBalance = (state) =>
  state.accounts.accounts.filter((a) => a.isActive).reduce((sum, a) => sum + a.currentBalance, 0)

export default accountsSlice.reducer
