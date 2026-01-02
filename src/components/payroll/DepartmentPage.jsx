// src/components/payroll/DepartmentPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PayslipList from './PayslipList';
import { usePayroll } from '../../contexts/PayrollContext';

export default function DepartmentPage() {
  const { dept = 'ALL' } = useParams();
  const { employees = [], removeEmployee } = usePayroll();

  // Filter employees by department
  const filteredEmployees = dept === 'ALL' || !dept
    ? employees.filter(emp => emp && emp.name?.toLowerCase() !== 'demo user')
    : employees.filter(emp => 
        emp && emp.department?.toUpperCase() === dept.toUpperCase()
      );

  const deptNames = {
    production: 'PRODUCTION',
    marketing: 'MARKETING',
    accounts: 'ACCOUNTS',
  };

  const title = dept === 'ALL' ? 'ALL PAYSLIPS' : deptNames[dept.toLowerCase()] || dept;

  return (
    <div>
      <h3>{title}</h3>
      <PayslipList employees={filteredEmployees} onDelete={removeEmployee} />
    </div>
  );
}
