import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
  };

  const clearEdit = () => {
    setTransactionToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/20">
              <span className="text-white font-bold text-xl leading-none">W</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Walletly.</h1>
          </div>
          <p className="text-gray-500 font-medium">Your personal finance dashboard</p>
        </header>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Stats + List) */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard />
            <TransactionList onEdit={handleEdit} />
          </div>

          {/* Right Column (Form Widget) */}
          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <TransactionForm 
                transactionToEdit={transactionToEdit} 
                clearEdit={clearEdit} 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default App;