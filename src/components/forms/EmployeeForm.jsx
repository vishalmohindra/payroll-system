// src/components/forms/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import { usePayroll } from '../../contexts/PayrollContext';
import { calculateSalary } from '../../utils/salaryCalc';

// Allowed designations per department
const DESIGNATIONS_BY_DEPT = {
  PRODUCTION: ['JE', 'SE'],
  MARKETING: ['ASM', 'ME'],
  ACCOUNTS: ['CS', 'CA'],
};

export default function EmployeeForm() {
  const { addEmployee, editEmployee, loading } = usePayroll();

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('PRODUCTION');
  const [designation, setDesignation] = useState('JE');
  const [basicSalary, setBasicSalary] = useState('');

  const isEditing = id !== null;

  // Valid designations for current department
  const designationOptions = DESIGNATIONS_BY_DEPT[department] || [];

  // Keep designation valid when department changes
  useEffect(() => {
    if (!designationOptions.includes(designation)) {
      const first = designationOptions[0] || 'JE';
      setDesignation(first);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  // Fill form when EDIT is clicked on a card
  useEffect(() => {
    function handleEditEvent(e) {
      const emp = e.detail;
      if (!emp) return;

      const dept = (emp.department || 'PRODUCTION').toUpperCase();
      const validDesgs = DESIGNATIONS_BY_DEPT[dept] || [];
      const rawDesg = (emp.designation || 'JE').toUpperCase();
      const fixedDesg = validDesgs.includes(rawDesg)
        ? rawDesg
        : validDesgs[0] || 'JE';

      setId(emp._id || null);
      setName(emp.name || '');
      setDepartment(dept);
      setDesignation(fixedDesg);
      setBasicSalary(
        emp.basicSalary != null ? String(emp.basicSalary) : ''
      );
    }

    window.addEventListener('payroll:edit-employee', handleEditEvent);
    return () => {
      window.removeEventListener('payroll:edit-employee', handleEditEvent);
    };
  }, []);

  function resetForm() {
    setId(null);
    setName('');
    setDepartment('PRODUCTION');
    setDesignation('JE');
    setBasicSalary('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const basic = Number(basicSalary) || 0;

    const deptKey = department.toLowerCase();
    const desgKey = designation.toLowerCase();

    const { hra, da, pf, gross } = calculateSalary(basic, deptKey, desgKey);

    const payload = {
      name: name.trim(),
      department,
      designation,
      basicSalary: basic,
      hra,
      da,
      pf,
      gross,
    };

    try {
      if (isEditing) {
        await editEmployee(id, payload);
      } else {
        await addEmployee(payload);
      }
      resetForm();
    } catch (err) {
      console.error('Save failed:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="field">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label>Department</label>
        <select
          value={department}
          onChange={e => {
            const dept = e.target.value;
            setDepartment(dept);
            const firstDesg = DESIGNATIONS_BY_DEPT[dept]?.[0] || 'JE';
            setDesignation(firstDesg);
          }}
        >
          <option value="PRODUCTION">PRODUCTION</option>
          <option value="MARKETING">MARKETING</option>
          <option value="ACCOUNTS">ACCOUNTS</option>
        </select>
      </div>

      <div className="field">
        <label>Designation</label>
        <select
          value={designation}
          onChange={e => setDesignation(e.target.value)}
        >
          {designationOptions.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Basic Salary</label>
        <input
          type="number"
          value={basicSalary}
          onChange={e => setBasicSalary(e.target.value)}
          required
        />
      </div>

      <div className="actions">
        <button type="submit" disabled={loading}>
          {isEditing ? 'UPDATE EMPLOYEE' : 'SAVE EMPLOYEE'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
          >
            CANCEL
          </button>
        )}
      </div>

      {/* Live payslip preview */}
      <div className="payslip-preview">
        <h3>LIVE PAYSLIP PREVIEW</h3>
        {basicSalary ? (
          (() => {
            const basic = Number(basicSalary) || 0;
            const deptKey = department.toLowerCase();
            const desgKey = designation.toLowerCase();
            const { hra, da, pf, gross } = calculateSalary(
              basic,
              deptKey,
              desgKey
            );
            return (
              <>
                <p>HRA: ₹ {hra}</p>
                <p>DA: ₹ {da}</p>
                <p>PF: ₹ {pf}</p>
                <p>GROSS: ₹ {gross}</p>
              </>
            );
          })()
        ) : (
          <p>Enter basic salary to see calculation.</p>
        )}
      </div>
    </form>
  );
}
