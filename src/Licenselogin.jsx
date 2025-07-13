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
