// src/contexts/PayrollContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api/employeeService';

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

  // FETCH — important: do NOT clear existing employees on error
  async function fetchEmployees() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getEmployees();
      setEmployees(Array.isArray(data) ? data.reverse() : []); // newest first
    } catch (err) {
      // keep previous employees in case fetch fails
      console.error('Failed to fetch employees:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to load employees');
      // DO NOT call setEmployees([]) here — we want to keep the UI list intact
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function addEmployee(payload) {
    setLoading(true);
    setError(null);
    try {
      const created = await api.createEmployee(payload);
      setEmployees(prev => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('Failed to create employee:', err);
      setError(err?.response?.data?.message || err?.message || 'Create failed');
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
      const updated = await api.updateEmployee(id, payload);
      setEmployees(prev => prev.map(e => (e._id === id ? updated : e)));
      return updated;
    } catch (err) {
      console.error('Failed to update employee:', err);
      setError(err?.response?.data?.message || err?.message || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // DELETE (pessimistic): call API first, only remove from UI on success
  async function removeEmployee(id) {
    setError(null);
    setLoading(true);
    try {
      await api.deleteEmployee(id);             // wait for server confirmation
      setEmployees(prev => prev.filter(e => e._id !== id)); // then update UI
      return true;
    } catch (err) {
      console.error('Failed to delete employee:', err);
      setError(err?.response?.data?.message || err?.message || 'Delete failed');
      // keep UI intact
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

  return <PayrollContext.Provider value={value}>{children}</PayrollContext.Provider>;
}
