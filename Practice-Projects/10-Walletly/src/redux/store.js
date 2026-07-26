import { configureStore } from "@reduxjs/toolkit"
import accountsReducer from "./slices/accountsSlice"
import incomeReducer from "./slices/incomeSlice"
import expenseReducer from "./slices/expenseSlice"
import transactionReducer from "./slices/transactionSlice"

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    income: incomeReducer,
    expense: expenseReducer,
    transaction: transactionReducer,
  },
})

export default store
