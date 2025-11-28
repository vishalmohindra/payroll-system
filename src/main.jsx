// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PayrollProvider } from './contexts/PayrollContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayrollProvider>
      <App />
    </PayrollProvider>
  </React.StrictMode>
);
