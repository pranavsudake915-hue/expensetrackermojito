import './SummaryPanel.css';
import { PieChart, TrendingUp } from 'lucide-react';

export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, curr) => sum + curr.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="glass-panel summary-panel">
      <div className="summary-header">
        <TrendingUp size={24} className="icon-trending" />
        <div>
          <h2 className="summary-title">Total Expenses</h2>
          <div className="total-amount">₹{total.toFixed(2)}</div>
        </div>
      </div>
      
      {expenses.length > 0 && (
        <div className="category-breakdown">
          <h3 className="breakdown-title">
            <PieChart size={18} />
            By Category
          </h3>
          <div className="breakdown-list">
            {sortedCategories.map(([category, amount]) => (
              <div key={category} className="breakdown-item">
                <span className="breakdown-name">{category}</span>
                <span className="breakdown-value">
                  ₹{amount.toFixed(2)} 
                  <span className="breakdown-percentage">
                    ({((amount / total) * 100).toFixed(0)}%)
                  </span>
                </span>
                <div 
                  className="breakdown-bar" 
                  style={{ width: `${(amount / total) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
