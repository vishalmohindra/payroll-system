// src/api/employeeService.js
import { API_BASE_URL } from './apiConfig';

// GET all employees
export async function getEmployees() {
  const res = await fetch(`${API_BASE_URL}/api/employees`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// CREATE employee
export async function createEmployee(payload) {
  const res = await fetch(`${API_BASE_URL}/api/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// UPDATE employee
export async function updateEmployee(id, payload) {
  const res = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// DELETE employee
export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
