// src/components/payroll/PayslipList.jsx
import React from 'react';
import { usePayroll } from '../../contexts/PayrollContext';
import EmployeeCard from './EmployeeCard';

export default function PayslipList() {
  const { employees = [], loading, error, removeEmployee } = usePayroll();

  // Hide demo employee(s) by name (adjust condition if needed)
  const visibleEmployees = employees.filter(
    emp => emp && emp.name?.toLowerCase() !== 'demo user'
  );

  async function handleDelete(id) {
    if (!id) return;
    if (!confirm('Delete this employee?')) return;

    try {
      await removeEmployee(id);
    } catch (err) {
      alert(
        'Delete failed: ' +
          (err?.response?.data?.message || err?.message || 'Server error')
      );
    }
  }

  return (
    <div>
      <h3>ALL PAYSLIPS</h3>

      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
      )}

      {loading && visibleEmployees.length === 0 && <div>Loading…</div>}

      {visibleEmployees.length === 0 ? (
        <div style={{ color: '#666' }}>
          {loading ? 'Loading employees...' : 'NO EMPLOYEES YET.'}
        </div>
      ) : (
        <div>
          {visibleEmployees.map(emp => (
            <EmployeeCard
              key={emp._id}
              employee={emp}
              onDelete={() => handleDelete(emp._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
