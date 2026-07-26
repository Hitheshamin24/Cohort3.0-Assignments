import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl shadow-xl shadow-black/50 border border-gray-700/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition duration-500"></div>
        <h3 className="text-sm text-gray-400 font-medium mb-1">Total Balance</h3>
        <p className={`text-4xl font-extrabold tracking-tight ${currentBalance >= 0 ? 'text-white' : 'text-red-400'}`}>
          ₹{currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl shadow-xl shadow-black/50 border border-gray-700/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition duration-500"></div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Income</h3>
        </div>
        <p className="text-3xl font-bold text-gray-100">₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl shadow-xl shadow-black/50 border border-gray-700/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition duration-500"></div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Expenses</h3>
        </div>
        <p className="text-3xl font-bold text-gray-100">₹{totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
};

export default Dashboard;
