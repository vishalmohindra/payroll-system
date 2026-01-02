// src/components/payroll/DepartmentTabs.jsx
import React, { useState } from 'react';
import PayslipList from './PayslipList';

const departments = ['ALL', 'PRODUCTION', 'MARKETING', 'ACCOUNTS'];

export default function DepartmentTabs({ employees, onDelete }) {
  const [activeDept, setActiveDept] = useState('ALL');

  // Filter employees by department
  const filteredEmployees = activeDept === 'ALL'
    ? employees.filter(emp => emp && emp.name?.toLowerCase() !== 'demo user')
    : employees.filter(emp => 
        emp && emp.department?.toUpperCase() === activeDept
      );

  return (
    <div className="dept-tabs">
      <div className="tab-header">
        {departments.map(dept => (
          <button
            key={dept}
            className={activeDept === dept ? 'tab-active' : 'tab'}
            onClick={() => setActiveDept(dept)}
          >
            {dept}
            <span className="tab-count">
              {employees.filter(emp => emp.department?.toUpperCase() === dept).length}
            </span>
          </button>
        ))}
      </div>

      <PayslipList employees={filteredEmployees} onDelete={onDelete} />
    </div>
  );
}
