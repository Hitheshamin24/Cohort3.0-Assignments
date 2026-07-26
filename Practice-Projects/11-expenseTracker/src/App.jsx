import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
    setIsMobileModalOpen(true);
  };

  const clearEdit = () => {
    setTransactionToEdit(null);
    setIsMobileModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        

        <header className="mb-10 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/20">
                <span className="text-white font-bold text-xl leading-none">W</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Walletly.</h1>
            </div>
            <p className="text-gray-500 font-medium">Your personal finance dashboard</p>
          </div>
          
          <button 
            onClick={() => { setTransactionToEdit(null); setIsMobileModalOpen(true); }}
            className="lg:hidden px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold shadow-md shadow-gray-900/10 active:scale-95 transition-transform"
          >
            + Add
          </button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Dashboard />
            <TransactionList onEdit={handleEdit} />
          </div>

          <div className={
            isMobileModalOpen 
              ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm lg:static lg:block lg:inset-auto lg:z-auto lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:col-span-1" 
              : "hidden lg:block lg:col-span-1"
          }>
            
            {isMobileModalOpen && (
              <div className="absolute inset-0 lg:hidden" onClick={clearEdit}></div>
            )}

            <div className={
              isMobileModalOpen 
                ? "relative z-10 w-full max-w-md lg:max-w-none lg:sticky lg:top-10 animate-in fade-in zoom-in-95 lg:animate-none" 
                : "sticky top-10"
            }>
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