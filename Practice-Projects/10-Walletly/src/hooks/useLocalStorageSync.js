import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../utils/localStorage"
import { setAccounts, selectAllAccounts } from "../redux/slices/accountsSlice"
import { setIncomes, selectAllIncomes } from "../redux/slices/incomeSlice"
import { setExpenses, selectAllExpenses } from "../redux/slices/expenseSlice"
import { setTransactions, selectAllTransactions } from "../redux/slices/transactionSlice"

const useLocalStorageSync = () => {
  const dispatch = useDispatch()

  // flag — load complete hone ke baad hi save karo
  const [initialized, setInitialized] = useState(false)

  const accounts = useSelector(selectAllAccounts)
  const incomes = useSelector(selectAllIncomes)
  const expenses = useSelector(selectAllExpenses)
  const transactions = useSelector(selectAllTransactions)

  // ek baar — mount pe load karo
  useEffect(() => {
    const savedAccounts     = loadFromStorage(STORAGE_KEYS.ACCOUNTS)
    const savedIncomes      = loadFromStorage(STORAGE_KEYS.INCOMES)
    const savedExpenses     = loadFromStorage(STORAGE_KEYS.EXPENSES)
    const savedTransactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS)

    if (savedAccounts)     dispatch(setAccounts(savedAccounts))
    if (savedIncomes)      dispatch(setIncomes(savedIncomes))
    if (savedExpenses)     dispatch(setExpenses(savedExpenses))
    if (savedTransactions) dispatch(setTransactions(savedTransactions))

    // ab save allow karo
    setInitialized(true)
  }, [dispatch])

  // save — sirf load ke baad
  useEffect(() => {
    if (!initialized) return
    saveToStorage(STORAGE_KEYS.ACCOUNTS, accounts)
  }, [initialized, accounts])

  useEffect(() => {
    if (!initialized) return
    saveToStorage(STORAGE_KEYS.INCOMES, incomes)
  }, [initialized, incomes])

  useEffect(() => {
    if (!initialized) return
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses)
  }, [initialized, expenses])

  useEffect(() => {
    if (!initialized) return
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
  }, [initialized, transactions])
}

export default useLocalStorageSync
