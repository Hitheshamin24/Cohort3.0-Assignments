import { createSlice, nanoid } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('transactions');
    if (serializedState === null) {
      return { transactions: [] };
    }
    return { transactions: JSON.parse(serializedState) };
  } catch (err) {
    return { transactions: [] };
  }
};

const initialState = loadState();

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = {
        id: nanoid(),
        name: action.payload.name,
        amount: action.payload.amount,
        type: action.payload.type,
      };
      state.transactions.push(newTransaction);
    },
    
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },

    updateTransaction: (state, action) => {
      const { id, name, amount, type } = action.payload;
      const existingTransaction = state.transactions.find((t) => t.id === id);
      
      if (existingTransaction) {
        existingTransaction.name = name;
        existingTransaction.amount = amount;
        existingTransaction.type = type;
      }
    }
  }
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
