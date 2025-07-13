# src/components/LicenseLogin.jsx
license_login_content = """
import React, { useState } from 'react';

export default function LicenseLogin({ onValidLicense }) {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (licenseKey.trim() === '') {
      setError('Please enter a license key');
      return;
    }
    setError('');
    onValidLicense(licenseKey.trim());
  };

  return (
    <div style={{ padding: '2rem', background: '#1e1e1e', borderRadius: '8px', maxWidth: 400, margin: '3rem auto', color: '#fff' }}>
      <h2>Enter Your License Key</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={licenseKey}
          onChange={e => setLicenseKey(e.target.value)}
          placeholder="License Key"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #444',
            marginBottom: '12px',
            background: '#121212',
            color: '#fff'
          }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#0077cc',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
"""
(src_path / "LicenseLogin.jsx").write_text(license_login_content.strip())

# src/components/ClientSymbolSelector.jsx
client_symbol_selector_content = """
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

  const toggleSymbol = symbol => selectedSymbols.includes(symbol)
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