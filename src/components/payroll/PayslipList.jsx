// src/components/payroll/PayslipList.jsx
import React from 'react';
import { usePayroll } from '../../contexts/PayrollContext';
import EmployeeCard from './EmployeeCard';

export default function PayslipList() {
  const { employees = [], loading, error, removeEmployee } = usePayroll();

  async function handleDelete(id) {
    if (!id) return;
    if (!confirm('Delete this employee?')) return;

    try {
      await removeEmployee(id);
      // optionally show toast: removed
    } catch (err) {
      // removeEmployee throws on failure and keeps the list intact
      alert('Delete failed: ' + (err?.response?.data?.message || err?.message || 'Server error'));
    }
  }

  return (
    <div>
      <h3>ALL PAYSLIPS</h3>

      {/* show error (non-blocking) — only a visible red note, don't hide list */}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      {/* if loading and no items yet */}
      {loading && employees.length === 0 && <div>Loading…</div>}

      {/* prefer showing the list when available */}
      {employees.length === 0 ? (
        <div style={{ color: '#666' }}>{loading ? 'Loading employees...' : 'NO EMPLOYEES YET.'}</div>
      ) : (
        <div>
          {employees.map(emp => (
            <EmployeeCard
              key={emp._id}
              employee={emp}
              // pass a direct callback which uses the Mongo _id
              onDelete={() => handleDelete(emp._id)}
              // EmployeeCard will dispatch edit event on EDIT button (form listens for it)
            />
          ))}
        </div>
      )}
    </div>
  );
}
