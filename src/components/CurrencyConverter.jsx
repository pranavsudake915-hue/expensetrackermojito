import { useState, useEffect } from 'react';
import './CurrencyConverter.css';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'];

export default function CurrencyConverter({ totalINR }) {
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (totalINR <= 0) {
      setConvertedAmount(0);
      return;
    }

    if (targetCurrency === 'INR') {
      setConvertedAmount(totalINR);
      return;
    }

    const fetchConversion = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${totalINR}&from=INR&to=${targetCurrency}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setConvertedAmount(data.rates[targetCurrency]);
      } catch (err) {
        setError('Failed to fetch conversion rate.');
        console.error('Conversion error:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchConversion, 500);
    return () => clearTimeout(debounceTimer);
  }, [totalINR, targetCurrency]);

  return (
    <div className="glass-panel converter-panel">
      <h3 className="converter-title">Currency Converter</h3>
      
      <div className="converter-controls">
        <div className="converter-amount">
          <span className="base-currency">INR</span>
          <span className="base-amount">₹{totalINR.toFixed(2)}</span>
        </div>
        
        <RefreshCcw size={20} className="icon-exchange" />
        
        <div className="converter-select-wrapper">
          <select 
            className="converter-select"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {CURRENCIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="converter-result">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="converter-error">
            <AlertTriangle size={16} />
            {error}
          </div>
        ) : (
          <div className="converted-value">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: targetCurrency }).format(convertedAmount || 0)}
          </div>
        )}
      </div>
    </div>
  );
}
