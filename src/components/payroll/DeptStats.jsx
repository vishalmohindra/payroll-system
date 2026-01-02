// src/components/payroll/DeptStats.jsx
import React from 'react';

export default function DeptStats({ employees = [] }) {
  // Group employees by department
  const depts = {
    PRODUCTION: employees.filter(emp => emp.department === 'PRODUCTION'),
    MARKETING: employees.filter(emp => emp.department === 'MARKETING'),
    ACCOUNTS: employees.filter(emp => emp.department === 'ACCOUNTS')
  };

  // Calculate stats for each dept
  const stats = {
    PRODUCTION: {
      count: depts.PRODUCTION.length,
      highest: Math.max(...depts.PRODUCTION.map(emp => emp.gross || 0)) || 0,
      lowest: Math.min(...depts.PRODUCTION.map(emp => emp.gross || 0)) || 0,
      average: depts.PRODUCTION.length 
        ? Math.round(depts.PRODUCTION.reduce((sum, emp) => sum + (emp.gross || 0), 0) / depts.PRODUCTION.length)
        : 0
    },
    MARKETING: {
      count: depts.MARKETING.length,
      highest: Math.max(...depts.MARKETING.map(emp => emp.gross || 0)) || 0,
      lowest: Math.min(...depts.MARKETING.map(emp => emp.gross || 0)) || 0,
      average: depts.MARKETING.length 
        ? Math.round(depts.MARKETING.reduce((sum, emp) => sum + (emp.gross || 0), 0) / depts.MARKETING.length)
        : 0
    },
    ACCOUNTS: {
      count: depts.ACCOUNTS.length,
      highest: Math.max(...depts.ACCOUNTS.map(emp => emp.gross || 0)) || 0,
      lowest: Math.min(...depts.ACCOUNTS.map(emp => emp.gross || 0)) || 0,
      average: depts.ACCOUNTS.length 
        ? Math.round(depts.ACCOUNTS.reduce((sum, emp) => sum + (emp.gross || 0), 0) / depts.ACCOUNTS.length)
        : 0
    }
  };

  return (
    <div className="dept-stats">
      <div className="dept-card">
        <h4>PRODUCTION</h4>
        <p>Employees: {stats.PRODUCTION.count}</p>
        <p>Highest: ₹{stats.PRODUCTION.highest}</p>
        <p>Lowest: ₹{stats.PRODUCTION.lowest}</p>
        <p>Avg: ₹{stats.PRODUCTION.average}</p>
      </div>
      
      <div className="dept-card">
        <h4>MARKETING</h4>
        <p>Employees: {stats.MARKETING.count}</p>
        <p>Highest: ₹{stats.MARKETING.highest}</p>
        <p>Lowest: ₹{stats.MARKETING.lowest}</p>
        <p>Avg: ₹{stats.MARKETING.average}</p>
      </div>
      
      <div className="dept-card">
        <h4>ACCOUNTS</h4>
        <p>Employees: {stats.ACCOUNTS.count}</p>
        <p>Highest: ₹{stats.ACCOUNTS.highest}</p>
        <p>Lowest: ₹{stats.ACCOUNTS.lowest}</p>
        <p>Avg: ₹{stats.ACCOUNTS.average}</p>
      </div>
    </div>
  );
}
