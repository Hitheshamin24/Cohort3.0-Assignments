import { createSlice } from "@reduxjs/toolkit"

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Healthcare",
  "Rent",
  "Travel",
  "Investment",
  "Others",
]

const initialState = {
  expenses: [],
}

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload)
    },

    updateExpense: (state, action) => {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) state.expenses[index] = action.payload
    },

    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload)
    },

    // localStorage se load
    setExpenses: (state, action) => {
      state.expenses = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase("auth/logout", () => initialState)
  },
})

export const { addExpense, updateExpense, deleteExpense, setExpenses } = expenseSlice.actions

// selectors
export const selectAllExpenses = (state) => state.expense.expenses

export const selectTotalExpense = (state) =>
  state.expense.expenses.reduce((sum, e) => sum + e.amount, 0)

// monthly expense
export const selectMonthlyExpense = (month, year) => (state) =>
  state.expense.expenses
    .filter((e) => {
      const d = new Date(e.date)
      return d.getMonth() === month && d.getFullYear() === year
    })
    .reduce((sum, e) => sum + e.amount, 0)

export default expenseSlice.reducer
