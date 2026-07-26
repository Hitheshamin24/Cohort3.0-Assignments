import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from "../utils/localStorage"
import { setCurrentUser, selectCurrentUser } from "../redux/slices/authSlice"
import { setAccounts, selectAllAccounts } from "../redux/slices/accountsSlice"
import { setIncomes, selectAllIncomes } from "../redux/slices/incomeSlice"
import { setExpenses, selectAllExpenses } from "../redux/slices/expenseSlice"
import { setTransactions, selectAllTransactions } from "../redux/slices/transactionSlice"

const useLocalStorageSync = () => {
  const dispatch = useDispatch()
  const [initialized, setInitialized] = useState(false)

  const currentUser = useSelector(selectCurrentUser)
  const accounts = useSelector(selectAllAccounts)
  const incomes = useSelector(selectAllIncomes)
  const expenses = useSelector(selectAllExpenses)
  const transactions = useSelector(selectAllTransactions)

  // mount pe — auth load karo
  useEffect(() => {
    const savedUser = loadFromStorage(STORAGE_KEYS.CURRENT_USER)
    if (savedUser) dispatch(setCurrentUser(savedUser))
    setInitialized(true)
  }, [dispatch])

  // jab user login kare — us user ka data load karo
  useEffect(() => {
    if (!currentUser) return
    const uid = currentUser.id
    const savedAccounts     = loadFromStorage(STORAGE_KEYS.ACCOUNTS(uid))
    const savedIncomes      = loadFromStorage(STORAGE_KEYS.INCOMES(uid))
    const savedExpenses     = loadFromStorage(STORAGE_KEYS.EXPENSES(uid))
    const savedTransactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS(uid))

    if (savedAccounts)     dispatch(setAccounts(savedAccounts))
    if (savedIncomes)      dispatch(setIncomes(savedIncomes))
    if (savedExpenses)     dispatch(setExpenses(savedExpenses))
    if (savedTransactions) dispatch(setTransactions(savedTransactions))
  }, [currentUser?.id, dispatch])

  // auth save/remove
  useEffect(() => {
    if (!initialized) return
    if (currentUser) {
      saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser)
    } else {
      removeFromStorage(STORAGE_KEYS.CURRENT_USER)
    }
  }, [initialized, currentUser])

  // data save — sirf logged in user ke liye, initialized ke baad
  useEffect(() => {
    if (!initialized || !currentUser) return
    saveToStorage(STORAGE_KEYS.ACCOUNTS(currentUser.id), accounts)
  }, [initialized, accounts, currentUser])

  useEffect(() => {
    if (!initialized || !currentUser) return
    saveToStorage(STORAGE_KEYS.INCOMES(currentUser.id), incomes)
  }, [initialized, incomes, currentUser])

  useEffect(() => {
    if (!initialized || !currentUser) return
    saveToStorage(STORAGE_KEYS.EXPENSES(currentUser.id), expenses)
  }, [initialized, expenses, currentUser])

  useEffect(() => {
    if (!initialized || !currentUser) return
    saveToStorage(STORAGE_KEYS.TRANSACTIONS(currentUser.id), transactions)
  }, [initialized, transactions, currentUser])
}

export default useLocalStorageSync
