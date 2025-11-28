// src/components/payroll/EmployeeCard.jsx
import React from 'react';

export default function EmployeeCard({ employee, isPreview = false, onDelete }) {
  if (!employee) return null;

  const {
    empId,
    name,
    department,
    designation,
    basicSalary,
    hra,
    da,
    pf,
    gross,
    _id,
  } = employee;

  const fmt = (v) => {
    if (v === undefined || v === null) return '—';
    if (typeof v === 'number') return `₹ ${Number(v).toLocaleString()}`;
    return String(v).toUpperCase();
  };

  function handleEdit() {
    const ev = new CustomEvent('payroll:edit-employee', { detail: employee });
    window.dispatchEvent(ev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDeleteClick() {
    if (onDelete) onDelete(_id);
  }

  return (
    <div className={`payslip-card ${isPreview ? 'payslip-card--preview' : ''}`}>
      <div className="payslip-card__header">
        <strong>{(name || '—').toUpperCase()}</strong>
        <small>{isPreview ? '—PREVIEW—' : (empId || _id || '—')}</small>
      </div>

      <div className="payslip-card__row">
        <div>
          <small>DEPT:</small>
          <div>{(department || '—').toUpperCase()}</div>
        </div>
        <div>
          <small>DESIGNATION:</small>
          <div>{(designation || '—').toUpperCase()}</div>
        </div>
        <div>
          <small>BASIC:</small>
          <div>{fmt(basicSalary)}</div>
        </div>
      </div>

      <div className="payslip-card__row payslip-card__row--bottom">
        <div>
          <small>HRA</small>
          <div>{fmt(hra)}</div>
        </div>
        <div>
          <small>DA</small>
          <div>{fmt(da)}</div>
        </div>
        <div>
          <small>PF</small>
          <div>{fmt(pf)}</div>
        </div>
        <div className="payslip-card__gross">
          <small>GROSS</small>
          <div className="payslip-card__gross-value">{fmt(gross)}</div>
        </div>
      </div>

      {!isPreview && (
        <div className="payslip-card__actions">
          <button onClick={handleEdit}>EDIT</button>
          <button onClick={handleDeleteClick}>DELETE</button>
        </div>
      )}
    </div>
  );
}
