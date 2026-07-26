import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

// Subscribe to store changes to save state to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('transactions', JSON.stringify(state.transactions.transactions));
});
