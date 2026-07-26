import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../features/transactions/transactionSlice';

const TransactionList = ({ onEdit }) => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  // Reverse the array to show newest first
  const sortedTransactions = [...transactions].reverse();

  return (
    <div className="bg-[#121419] rounded-3xl p-6 border border-gray-800 shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-gray-100 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Activity
      </h2>
      
      {sortedTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No transactions found. Add one to get started!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sortedTransactions.map((transaction) => (
            <li 
              key={transaction.id} 
              className="group flex justify-between items-center p-4 bg-[#1a1d24] hover:bg-[#1f232b] rounded-2xl border border-gray-800 transition duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {transaction.type === 'income' ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-200 text-lg">{transaction.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <p className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex gap-2 transition-opacity">
                  <button 
                    onClick={() => onEdit(transaction)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => dispatch(deleteTransaction(transaction.id))}
                    className="p-2 bg-red-900/30 hover:bg-red-500/50 text-red-400 rounded-lg transition"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
