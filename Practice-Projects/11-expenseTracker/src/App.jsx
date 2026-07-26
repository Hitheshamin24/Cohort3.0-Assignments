import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const clearEdit = () => {
    setTransactionToEdit(null);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setTransactionToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background gradients for modern fintech look */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Walletly
            </h1>
            <p className="text-gray-400 text-sm">Track your finances with ease</p>
          </div>
          <button 
            onClick={handleOpenModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-1"
          >
            + Add Transaction
          </button>
        </header>
        
        <Dashboard />
        
        <TransactionList onEdit={handleEdit} />
        
      </div>

      {/* Modal Popup for Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={clearEdit}
          ></div>
          <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <TransactionForm 
              transactionToEdit={transactionToEdit} 
              clearEdit={clearEdit} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;