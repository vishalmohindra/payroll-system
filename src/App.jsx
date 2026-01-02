// src/App.jsx
import React from 'react';
import EmployeeForm from './components/forms/EmployeeForm';
import DepartmentTabs from './components/payroll/DepartmentTabs';
import DeptStats from './components/payroll/DeptStats';
import { usePayroll } from './contexts/PayrollContext';
import './App.css';

export default function App() {
  const { employees = [], removeEmployee } = usePayroll();

  // Filter out demo users
  const visibleEmployees = employees.filter(
    emp => emp && emp.name?.toLowerCase() !== 'demo user'
  );

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">PAYROLL SYSTEM</h1>
        <p className="app-subtitle">
          SMART, SIMPLE & COLORFUL SALARY MANAGER
        </p>
      </header>

      <main className="app-main">
        <section className="app-panel">
          <h2 className="panel-title">ADD EMPLOYEE</h2>
          <EmployeeForm />
        </section>

        <aside className="app-panel app-panel--side">
          <DepartmentTabs employees={visibleEmployees} onDelete={removeEmployee} />
          <DeptStats />
        </aside>
      </main>
    </div>
  );
}
