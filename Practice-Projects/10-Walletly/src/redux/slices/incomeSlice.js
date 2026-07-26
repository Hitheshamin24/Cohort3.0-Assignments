import { createSlice } from "@reduxjs/toolkit"

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelancing",
  "Business",
  "Investment",
  "Gift",
  "Other",
]

const initialState = {
  incomes: [],
}

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomes.push(action.payload)
    },

    updateIncome: (state, action) => {
      const index = state.incomes.findIndex((i) => i.id === action.payload.id)
      if (index !== -1) state.incomes[index] = action.payload
    },

    deleteIncome: (state, action) => {
      state.incomes = state.incomes.filter((i) => i.id !== action.payload)
    },

    // localStorage se load
    setIncomes: (state, action) => {
      state.incomes = action.payload
    },
  },
})

export const { addIncome, updateIncome, deleteIncome, setIncomes } = incomeSlice.actions

// selectors
export const selectAllIncomes = (state) => state.income.incomes

export const selectTotalIncome = (state) =>
  state.income.incomes.reduce((sum, i) => sum + i.amount, 0)

// monthly income — current month
export const selectMonthlyIncome = (month, year) => (state) =>
  state.income.incomes
    .filter((i) => {
      const d = new Date(i.date)
      return d.getMonth() === month && d.getFullYear() === year
    })
    .reduce((sum, i) => sum + i.amount, 0)

export default incomeSlice.reducer
