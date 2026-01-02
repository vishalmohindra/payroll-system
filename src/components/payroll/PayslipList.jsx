// src/components/payroll/PayslipList.jsx
import React from 'react';
import EmployeeCard from './EmployeeCard';

export default function PayslipList({ employees = [], onDelete }) {
  if (employees.length === 0) {
    return (
      <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
        No employees in this department yet.
      </div>
    );
  }

  return (
    <div>
      {employees.map(emp => (
        <EmployeeCard
          key={emp._id}
          employee={emp}
          onDelete={() => onDelete(emp._id)}
        />
      ))}
    </div>
  );
}
