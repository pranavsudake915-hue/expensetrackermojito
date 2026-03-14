import './ExpenseItem.css';
import { Trash2 } from 'lucide-react';

export default function ExpenseItem({ expense, onDelete }) {
  const { id, name, amount, category, date } = expense;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="expense-item glass-panel-sm">
      <div className="expense-info">
        <h3 className="expense-name">{name}</h3>
        <div className="expense-meta">
          <span className="expense-category tag">{category}</span>
          <span className="expense-date">{formattedDate}</span>
        </div>
      </div>
      <div className="expense-actions">
        <div className="expense-amount">
          ₹{amount.toFixed(2)}
        </div>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(id)}
          aria-label="Delete expense"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
