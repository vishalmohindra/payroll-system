// src/contexts/PayrollContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api/employeeService';
import { calculateSalary } from '../utils/salaryCalc';

const PayrollContext = createContext();

export function usePayroll() {
  return useContext(PayrollContext);
}

export function PayrollProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // initial load
  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchEmployees() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getEmployees();
      setEmployees(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to load employees'
      );
    } finally {
      setLoading(false);
    }
  }

  // Helper: recompute HRA/DA/PF/GROSS from basic + dept + designation
  function withCalculatedSalary(payload) {
    const basic = Number(payload.basicSalary) || 0;
    const deptKey = (payload.department || 'production').toLowerCase();
    const desgKey = (payload.designation || 'je').toLowerCase();

    const { hra, da, pf, gross } = calculateSalary(basic, deptKey, desgKey);

    return {
      ...payload,
      basicSalary: basic,
      hra,
      da,
      pf,
      gross,
    };
  }

  // CREATE
  async function addEmployee(payload) {
    setLoading(true);
    setError(null);
    try {
      const finalPayload = withCalculatedSalary(payload);
      const created = await api.createEmployee(finalPayload);
      setEmployees(prev => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('Failed to create employee:', err);
      setError(
        err?.response?.data?.message || err?.message || 'Create failed'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // UPDATE
  async function editEmployee(id, payload) {
    setLoading(true);
    setError(null);
    try {
      const finalPayload = withCalculatedSalary(payload);
      const updated = await api.updateEmployee(id, finalPayload);
      setEmployees(prev => prev.map(e => (e._id === id ? updated : e)));
      return updated;
    } catch (err) {
      console.error('Failed to update employee:', err);
      setError(
        err?.response?.data?.message || err?.message || 'Update failed'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // DELETE
  async function removeEmployee(id) {
    setError(null);
    setLoading(true);
    try {
      await api.deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e._id !== id));
      return true;
    } catch (err) {
      console.error('Failed to delete employee:', err);
      setError(
        err?.response?.data?.message || err?.message || 'Delete failed'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    employees,
    loading,
    error,
    fetchEmployees,
    addEmployee,
    editEmployee,
    removeEmployee,
  };

  return (
    <PayrollContext.Provider value={value}>
      {children}
    </PayrollContext.Provider>
  );
}
