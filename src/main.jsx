# src/main.jsx
main_jsx_content = """
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import LicenseLogin from './components/LicenseLogin';
import ClientSymbolSelector from './components/ClientSymbolSelector';

function App() {
  const [licenseKey, setLicenseKey] = useState(null);

  if (!licenseKey) {
    return <LicenseLogin onValidLicense={setLicenseKey} />;
  }

  return <ClientSymbolSelector licenseKey={licenseKey} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
"""
(frontend_path / "src" / "main.jsx").write_text(main_jsx_content.strip())
);
