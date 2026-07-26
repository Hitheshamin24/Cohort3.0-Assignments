import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, updateTransaction } from '../features/transactions/transactionSlice';

const TransactionForm = ({ transactionToEdit, clearEdit }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  useEffect(() => {
    if (transactionToEdit) {
      setName(transactionToEdit.name);
      setAmount(transactionToEdit.amount);
      setType(transactionToEdit.type);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    if (transactionToEdit) {
      dispatch(updateTransaction({ id: transactionToEdit.id, name, amount: Number(amount), type }));
    } else {
      dispatch(addTransaction({ name, amount: Number(amount), type }));
    }
    
    setName('');
    setAmount('');
    setType('expense');
    clearEdit(); // Close modal after submit
  };

  return (
    <div className="bg-[#1a1d24] p-6 rounded-2xl shadow-2xl border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          {transactionToEdit ? 'Update Transaction' : 'New Transaction'}
        </h2>
        <button 
          onClick={clearEdit}
          className="text-gray-400 hover:text-white transition"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-400">Transaction Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0f1115] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            placeholder="e.g. Salary, Rent, Groceries"
            autoFocus
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-400">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 pl-8 rounded-xl bg-[#0f1115] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-400">Transaction Type</label>
          <div className="flex gap-4">
            <label className={`flex-1 flex justify-center items-center gap-2 cursor-pointer p-3 rounded-xl border transition ${type === 'income' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-[#0f1115] border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              <input 
                type="radio" 
                name="type" 
                value="income" 
                checked={type === 'income'} 
                onChange={() => setType('income')}
                className="hidden"
              />
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-semibold">Income</span>
            </label>
            <label className={`flex-1 flex justify-center items-center gap-2 cursor-pointer p-3 rounded-xl border transition ${type === 'expense' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-[#0f1115] border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              <input 
                type="radio" 
                name="type" 
                value="expense" 
                checked={type === 'expense'} 
                onChange={() => setType('expense')}
                className="hidden"
              />
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <span className="font-semibold">Expense</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-0.5"
        >
          {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
