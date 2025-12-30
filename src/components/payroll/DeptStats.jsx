// src/components/payroll/DeptStats.jsx
import React from 'react';
import { usePayroll } from '../../contexts/PayrollContext';

const DEPTS = ['PRODUCTION', 'MARKETING', 'ACCOUNTS'];

function formatMoney(v) {
  if (v == null || Number.isNaN(v)) return '—';
  return `₹ ${Number(v).toLocaleString()}`;
}

export default function DeptStats() {
  const { employees = [] } = usePayroll();

  function getStatsForDept(deptLabel) {
    const deptKey = deptLabel.toUpperCase();
    const filtered = employees.filter(
      e => (e.department || '').toUpperCase() === deptKey
    );
    const count = filtered.length;
    if (count === 0) {
      return { count: 0, min: null, max: null, avg: null };
    }

    const grossList = filtered.map(e => Number(e.gross) || 0);
    const max = Math.max(...grossList);
    const min = Math.min(...grossList);
    const sum = grossList.reduce((acc, v) => acc + v, 0);
    const avg = Math.round(sum / count);

    return { count, min, max, avg };
  }

  return (
    <div className="dept-stats">
      <h3>DEPARTMENT STATS</h3>
      {DEPTS.map(dept => {
        const { count, min, max, avg } = getStatsForDept(dept);
        return (
          <div key={dept} className="dept-stats__row">
            <h4>{dept}</h4>
            <p>Total employees: {count}</p>
            <p>Highest pay: {formatMoney(max)}</p>
            <p>Lowest pay: {formatMoney(min)}</p>
            <p>Average pay: {formatMoney(avg)}</p>
          </div>
        );
      })}
    </div>
  );
}
