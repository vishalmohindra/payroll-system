// src/components/payroll/StatsPage.jsx
import React from 'react';
import DeptStats from './DeptStats';
import { usePayroll } from '../../contexts/PayrollContext';

export default function StatsPage() {
  const { employees = [] } = usePayroll();

  const visibleEmployees = employees.filter(
    emp => emp && emp.name?.toLowerCase() !== 'demo user'
  );

  return (
    <div className="stats-page">
      <h3>📊 DEPARTMENT STATISTICS</h3>
      <DeptStats employees={visibleEmployees} />
    </div>
  );
}
