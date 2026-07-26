import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import accountsReducer from "./slices/accountsSlice"
import incomeReducer from "./slices/incomeSlice"
import expenseReducer from "./slices/expenseSlice"
import transactionReducer from "./slices/transactionSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    income: incomeReducer,
    expense: expenseReducer,
    transaction: transactionReducer,
  },
})

export default store
