// src/components/payroll/DeptStats.jsx
import React from 'react';

export default function DeptStats({ employees = [] }) {
  const departments = ['PRODUCTION', 'MARKETING', 'ACCOUNTS'];

  const deptData = departments.map(dept => {
    const deptEmployees = employees.filter(
      emp => emp.department?.toUpperCase() === dept
    );
    
    const totalSalary = deptEmployees.reduce(
      (sum, emp) => sum + (emp.salary || 0), 0
    );

    return {
      name: dept,
      count: deptEmployees.length,
      total: totalSalary,
      highest: Math.max(...deptEmployees.map(emp => emp.salary || 0)),
      avg: deptEmployees.length ? (totalSalary / deptEmployees.length).toFixed(0) : 0
    };
  });

  const grandTotal = deptData.reduce((sum, d) => sum + d.total, 0);
  const totalEmployees = deptData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="dept-stats">
      <div className="stats-grid">
        {deptData.map(dept => (
          <div key={dept.name} className="stat-card">
            <h4>{dept.name}</h4>
            <div className="stat-item">
              <span>Employees:</span> <strong>{dept.count}</strong>
            </div>
            <div className="stat-item">
              <span>Total:</span> <strong>₹{dept.total.toLocaleString()}</strong>
            </div>
            <div className="stat-item">
              <span>Highest:</span> <strong>₹{dept.highest.toLocaleString()}</strong>
            </div>
            <div className="stat-item">
              <span>Avg:</span> <strong>₹{dept.avg.toLocaleString()}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="grand-total">
        <h4>GRAND TOTAL</h4>
        <div className="stat-item">
          <span>Employees:</span> <strong>{totalEmployees}</strong>
        </div>
        <div className="stat-item grand">
          <span>Total Salary:</span> <strong>₹{grandTotal.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
}
