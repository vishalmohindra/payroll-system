// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { PayrollProvider } from './contexts/PayrollContext.jsx';  // Named import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PayrollProvider>
        <App />
      </PayrollProvider>
    </BrowserRouter>
  </React.StrictMode>
);
