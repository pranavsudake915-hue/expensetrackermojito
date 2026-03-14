import { useState, useEffect } from 'react';

import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';
import { Leaf, LucideLeafyGreen } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalINR = expenses.reduce((sum, curr) => sum + curr.amount, 0);

  return (
    
    <div className="app-container">
      
      <header className="header-container">
        <div className="title-wrapper">
          <LucideLeafyGreen className="logo-icon" size={42} />
          <div className="title">Mojito</div>
        </div>
        <div className="subtitle">Premium Expense Tracker</div>
      </header>

      <div className="sidebar">
        <ExpenseForm onAddExpense={handleAddExpense} />
        <SummaryPanel expenses={expenses} />
        <CurrencyConverter totalINR={totalINR} />
      </div>
      
      <main className="main-content">
        <ExpenseList 
          expenses={expenses} 
          onDeleteExpense={handleDeleteExpense} 
        />
      </main>
    </div>
  );
}

export default App;
