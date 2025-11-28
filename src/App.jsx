// src/App.jsx
import React from 'react';
import EmployeeForm from './components/forms/EmployeeForm';
import PayslipList from './components/payroll/PayslipList';
import './App.css';

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">PAYROLL SYSTEM</h1>
        <p className="app-subtitle">SMART, SIMPLE & COLORFUL SALARY MANAGER</p>
      </header>

      <main className="app-main">
        <section className="app-panel">
          <h2 className="panel-title">ADD EMPLOYEE</h2>
          <EmployeeForm />
        </section>

        <aside className="app-panel app-panel--side">
          {/* remove the dull small heading */}
          <PayslipList />
        </aside>
      </main>
    </div>
  );
}
