// src/api/employeeService.js

/**
 * Base URL:
 *  - Use Vite env if set, e.g. VITE_API_BASE_URL="http://127.0.0.1:5000/api"
 *  - Otherwise fall back to local dev backend.
 */
const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api'
).replace(/\/$/, ''); // remove trailing slash

async function request(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  // If backend returns 4xx/5xx, throw with message
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message);
  }

  // DELETE can return empty body; handle that safely
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function getEmployees(department) {
  const url = department
    ? `/employees?department=${encodeURIComponent(department)}`
    : '/employees';
  return request(url, { method: 'GET' });
}

export function createEmployee(payload) {
  return request('/employees', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateEmployee(id, payload) {
  return request(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteEmployee(id) {
  return request(`/employees/${id}`, {
    method: 'DELETE',
  });
}

export function getAverages() {
  return request('/employees/stats/averages', { method: 'GET' });
}
