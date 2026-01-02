// src/App.jsx
import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import EmployeeForm from './components/forms/EmployeeForm';
import DepartmentPage from './components/payroll/DepartmentPage';
import DeptStats from './components/payroll/DeptStats';
import { usePayroll } from './contexts/PayrollContext';
import './App.css';

function Dashboard() {
  const { employees = [] } = usePayroll();

  // Filter out demo users
  const visibleEmployees = employees.filter(
    emp => emp && emp.name?.toLowerCase() !== 'demo user'
  );

  const getDeptCount = (dept) => {
    return visibleEmployees.filter(emp => emp.department?.toUpperCase() === dept).length;
  };

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
          <div className="dept-nav">
            <Link to="/" className="dept-link">
              Dashboard ({visibleEmployees.length})
            </Link>
            <Link to="/production" className="dept-link">
              PRODUCTION ({getDeptCount('PRODUCTION')})
            </Link>
            <Link to="/marketing" className="dept-link">
              MARKETING ({getDeptCount('MARKETING')})
            </Link>
            <Link to="/accounts" className="dept-link">
              ACCOUNTS ({getDeptCount('ACCOUNTS')})
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<DepartmentPage />} />
            <Route path="/production" element={<DepartmentPage />} />
            <Route path="/marketing" element={<DepartmentPage />} />
            <Route path="/accounts" element={<DepartmentPage />} />
          </Routes>

          <DeptStats />
        </aside>
      </main>
    </div>
  );
}

export default function App() {
  return <Dashboard />;
}
