import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Action to add a transaction (income or expense)
    addTransaction: (state, action) => {
      const newTransaction = {
        id: nanoid(),
        name: action.payload.name,
        amount: action.payload.amount,
        type: action.payload.type, // 'income' or 'expense'
      };
      state.transactions.push(newTransaction);
    },
    
    // Action to delete a transaction
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },

    // Action to update/edit a transaction
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
