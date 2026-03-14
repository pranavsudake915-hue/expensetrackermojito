import { useState } from 'react';
import './ExpenseForm.css';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'lucide-react';

const CATEGORIES = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];

export default function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name for the expense.');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    
    const expense = {
      id: uuidv4(),
      name: name.trim(),
      amount: Number(amount),
      category,
      date: new Date().toISOString()
    };
    
    onAddExpense(expense);
    setName('');
    setAmount('');
    setCategory(CATEGORIES[0]);
  };

  return (
    <div className="glass-panel expense-form-container">
      <h2 className="panel-title">Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="name">Expense Name</label>
          <input
            type="text"
            id="name"
            placeholder="e.g.lunch at restaurant "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="e.g. 500"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-submit">
          <PlusCircle size={20} />
          <span>Add Expense</span>
        </button>
      </form>
    </div>
  );
}
