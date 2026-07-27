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
    clearEdit();
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {transactionToEdit ? 'Edit Transaction' : 'Quick Transfer'}
        </h2>

        {transactionToEdit && (
          <button 
            onClick={() => {
              clearEdit();
              setName('');
              setAmount('');
              setType('expense');
            }}
            className="hidden lg:block text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider"
          >
            Cancel
          </button>
        )}
        

        <button 
          onClick={() => {
            clearEdit();
            setName('');
            setAmount('');
            setType('expense');
          }}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Transaction Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="e.g. Spotify, Groceries"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3.5 pl-8 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Type</label>
          <div className="flex gap-3">
            <label className={`flex-1 flex justify-center items-center gap-2 cursor-pointer p-3.5 rounded-xl border-2 transition-all backdrop-blur-sm ${type === 'income' ? 'bg-green-500/10 border-green-500/30 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200'}`}>
              <input 
                type="radio" 
                name="type" 
                value="income" 
                checked={type === 'income'} 
                onChange={() => setType('income')}
                className="hidden"
              />
              <span className="font-semibold text-sm">Income</span>
            </label>
            <label className={`flex-1 flex justify-center items-center gap-2 cursor-pointer p-3.5 rounded-xl border-2 transition-all backdrop-blur-sm ${type === 'expense' ? 'bg-red-500/10 border-red-500/30 text-red-700' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200'}`}>
              <input 
                type="radio" 
                name="type" 
                value="expense" 
                checked={type === 'expense'} 
                onChange={() => setType('expense')}
                className="hidden"
              />
              <span className="font-semibold text-sm">Expense</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full mt-2 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold shadow-lg shadow-gray-900/10 transition-all active:scale-95"
        >
          {transactionToEdit ? 'Save Changes' : 'Send Transfer'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
