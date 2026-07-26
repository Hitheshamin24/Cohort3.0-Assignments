import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, deleteTransaction, updateTransaction } from './features/transactions/transactionSlice';

const App = () => {
  // Access state from Redux store
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  // Local state for our form
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'income' or 'expense'
  
  // Local state to keep track of if we are editing
  const [editId, setEditId] = useState(null);

  // Calculate Totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    if (editId) {
      // Dispatch update action
      dispatch(updateTransaction({ id: editId, name, amount: Number(amount), type }));
      setEditId(null);
    } else {
      // Dispatch add action
      dispatch(addTransaction({ name, amount: Number(amount), type }));
    }
    
    // Reset form
    setName('');
    setAmount('');
    setType('expense');
  };

  const handleEdit = (transaction) => {
    setEditId(transaction.id);
    setName(transaction.name);
    setAmount(transaction.amount);
    setType(transaction.type);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Expense Tracker</h1>
        
        {/* DASHBOARD */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg text-center shadow">
            <h3 className="text-sm text-gray-400 font-medium">Balance</h3>
            <p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${currentBalance.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center shadow border-b-4 border-green-500">
            <h3 className="text-sm text-gray-400 font-medium">Income</h3>
            <p className="text-xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center shadow border-b-4 border-red-500">
            <h3 className="text-sm text-gray-400 font-medium">Expense</h3>
            <p className="text-xl font-bold text-red-400">${totalExpense.toFixed(2)}</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 bg-gray-750 p-4 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-2">
            {editId ? 'Update Transaction' : 'Add New Transaction'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
                placeholder="e.g. Salary or Groceries"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Amount ($)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="type" 
                  value="income" 
                  checked={type === 'income'} 
                  onChange={() => setType('income')}
                  className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600"
                />
                <span className="text-green-400 font-medium">Income</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="type" 
                  value="expense" 
                  checked={type === 'expense'} 
                  onChange={() => setType('expense')}
                  className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600"
                />
                <span className="text-red-400 font-medium">Expense</span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            {editId ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </form>

        {/* LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No transactions yet.</p>
          ) : (
            <ul className="space-y-3">
              {transactions.map((transaction) => (
                <li 
                  key={transaction.id} 
                  className={`flex justify-between items-center p-4 bg-gray-700 rounded-lg shadow-sm border-l-4 ${transaction.type === 'income' ? 'border-l-green-500' : 'border-l-red-500'}`}
                >
                  <div>
                    <p className="font-semibold text-lg">{transaction.name}</p>
                    <p className={`font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(transaction)}
                      className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => dispatch(deleteTransaction(transaction.id))}
                      className="px-3 py-1 text-sm bg-red-600/80 hover:bg-red-500 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default App;