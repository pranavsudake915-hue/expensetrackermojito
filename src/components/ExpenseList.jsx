import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';
import { Receipt } from 'lucide-react';

export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="glass-panel empty-state">
        <div className="empty-icon">
          <Receipt size={48} />
        </div>
        <h3>No expenses yet</h3>
        <p>Add an expense to see it here.</p>
      </div>
    );
  }

  // Sort expenses by date descending
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="glass-panel expense-list-container">
      <h2 className="panel-title">Recent Expenses</h2>
      <div className="expense-list">
        {sortedExpenses.map(expense => (
          <ExpenseItem 
            key={expense.id} 
            expense={expense} 
            onDelete={onDeleteExpense} 
          />
        ))}
      </div>
    </div>
  );
}
