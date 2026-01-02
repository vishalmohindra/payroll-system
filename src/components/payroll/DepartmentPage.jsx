// src/components/payroll/DepartmentPage.jsx
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PayslipList from './PayslipList';
import { usePayroll } from '../../contexts/PayrollContext';

export default function DepartmentPage() {
  const { dept = '' } = useParams();
  const location = useLocation();
  const { employees = [], removeEmployee } = usePayroll();

  // Filter out demo users
  const visibleEmployees = employees.filter(
    emp => emp && emp.name?.toLowerCase() !== 'demo user'
  );

  // On dashboard (/), show ONLY the most recent payslip
  let filteredEmployees;
  if (dept === '' || !dept) {
    // Dashboard: show only the newest one (or empty)
    filteredEmployees = visibleEmployees.slice(0, 1);
  } else {
    // Department pages: filter by department
    filteredEmployees = visibleEmployees.filter(emp => 
      emp && emp.department?.toUpperCase() === dept.toUpperCase()
    );
  }

  const deptNames = {
    production: 'PRODUCTION',
    marketing: 'MARKETING',
    accounts: 'ACCOUNTS',
  };

  const title = !dept ? 'RECENT PAYSLIP' : (deptNames[dept.toLowerCase()] || dept);

  return (
    <div>
      <h3>{title}</h3>
      <PayslipList employees={filteredEmployees} onDelete={removeEmployee} />
    </div>
  );
}
