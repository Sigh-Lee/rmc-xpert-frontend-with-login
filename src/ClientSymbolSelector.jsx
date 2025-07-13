import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClientSymbolSelector({ licenseKey }) {
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!licenseKey) return;

    axios.get(`/api/client/mentor-symbols?licenseKey=${licenseKey}`)
      .then(res => setAvailableSymbols(res.data.symbols || []));

    axios.get(`/api/client/my-symbols?licenseKey=${licenseKey}`)
      .then(res => setSelectedSymbols(res.data.symbols || []));
  }, [licenseKey]);

  const toggleSymbol = symbol =>
    selectedSymbols.includes(symbol)
      ? setSelectedSymbols(prev => prev.filter(s => s !== symbol))
      : setSelectedSymbols(prev => [...prev, symbol]);

  const saveSymbols = () => {
    axios.post('/api/client/update-symbols', { licenseKey, symbols: selectedSymbols })
      .then(() => {
        setMessage('✅ Symbols updated successfully.');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  return (
    <div style={{ padding: '2rem', background: '#1e1e1e', borderRadius: '8px', maxWidth: 600, margin: '3rem auto', color: '#fff' }}>
      <h2>Select Symbols to Trade</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: '8px', margin: '16px 0' }}>
        {availableSymbols.map(sym => (
          <button
            key={sym}
            onClick={() => toggleSymbol(sym)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid',
              background: selectedSymbols.includes(sym) ? '#116611' : '#333',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {sym}
          </button>
        ))}
      </div>
      <button onClick={saveSymbols} style={{ padding: '8px 16px', background: '#0077cc', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Save Selection
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
