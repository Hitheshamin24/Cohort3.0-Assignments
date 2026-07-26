import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('transactions', JSON.stringify(state.transactions.transactions));
});
