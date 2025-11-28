// src/components/forms/EmployeeForm.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { calculateSalary } from '../../utils/salaryCalc';
import EmployeeCard from '../payroll/EmployeeCard';
import { usePayroll } from '../../contexts/PayrollContext';

const DEPT_OPTIONS = [
  { value: 'production', label: 'PRODUCTION' },
  { value: 'marketing', label: 'MARKETING' },
  { value: 'accounts', label: 'ACCOUNTS' }
];

export default function EmployeeForm() {
  const { addEmployee, editEmployee } = usePayroll();

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('production');
  const [designation, setDesignation] = useState('je');
  const [basicSalary, setBasicSalary] = useState('');
  const [editingId, setEditingId] = useState(null);

  function getDesignationsForDept(dept) {
    const map = {
      production: ['je', 'se'],
      marketing: ['asm', 'me'],
      accounts: ['cs', 'ca']
    };
    return map[dept] || [];
  }

  useEffect(() => {
    const list = getDesignationsForDept(department);
    if (!list.includes(designation)) {
      setDesignation(list[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  // listen for edit events dispatched from cards
  useEffect(() => {
    function onEditEvent(e) {
      const emp = e.detail;
      if (!emp) return;
      setEditingId(emp._id || null);
      setName(emp.name || '');
      setDepartment(emp.department || 'production');
      setDesignation(emp.designation || getDesignationsForDept(emp.department || 'production')[0]);
      setBasicSalary(emp.basicSalary ? String(emp.basicSalary) : '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.addEventListener('payroll:edit-employee', onEditEvent);
    return () => window.removeEventListener('payroll:edit-employee', onEditEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const basicNum = Number(basicSalary) || 0;

  const previewSalary = useMemo(() => {
    return calculateSalary(basicNum, department, designation);
  }, [basicNum, department, designation]);

  const previewEmployee = {
    empId: null,
    name,
    department,
    designation,
    basicSalary: basicNum,
    ...previewSalary
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert('Enter name');
    if (!basicNum || basicNum <= 0) return alert('Enter a valid basic salary');

    const payload = { name: name.trim(), department, designation, basicSalary: basicNum };
    try {
      if (editingId) {
        await editEmployee(editingId, payload);
        setEditingId(null);
      } else {
        await addEmployee(payload);
      }
      // reset
      setName('');
      setBasicSalary('');
      setDepartment('production');
      setDesignation('je');
    } catch (err) {
      alert('Failed to save: ' + (err?.message || err));
    }
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 12, display: 'grid', gap: 8 }}>
        <div>
          <label style={{ display: 'block' }}>NAME</label>
          <input name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter employee name" />
        </div>

        <div>
          <label style={{ display: 'block' }}>DEPARTMENT</label>
          <select name="department" value={department} onChange={e => setDepartment(e.target.value)}>
            {DEPT_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block' }}>DESIGNATION</label>
          <select name="designation" value={designation} onChange={e => setDesignation(e.target.value)}>
            {getDesignationsForDept(department).map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block' }}>BASIC SALARY</label>
          <input
            name="basicSalary"
            value={basicSalary}
            onChange={e => setBasicSalary(e.target.value.replace(/[^\d.]/g, ''))}
            placeholder="Enter basic salary (numbers only)"
          />
        </div>

        <div>
          <button type="submit">{editingId ? 'UPDATE EMPLOYEE' : 'SAVE EMPLOYEE'}</button>
          {editingId && (
            <button type="button" onClick={() => {
              setEditingId(null);
              setName('');
              setBasicSalary('');
              setDepartment('production');
              setDesignation('je');
            }}>CANCEL</button>
          )}
        </div>
      </form>

      <h4>LIVE PAYSLIP PREVIEW</h4>
      <EmployeeCard employee={previewEmployee} isPreview />
    </div>
  );
}
