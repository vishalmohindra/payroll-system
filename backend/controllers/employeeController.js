const Employee = require('../models/Employee');

// helper to generate empId if frontend doesn't send one
function makeEmpId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PAY-${y}${m}${d}-${rand}`;
}

// helper to compute salary parts
function computeSalaryParts(basicSalary) {
  const basic = Number(basicSalary) || 0;
  const hra = Math.round(basic * 0.2);   // 20%
  const da  = Math.round(basic * 0.1);   // 10%
  const pf  = Math.round(basic * 0.11);  // 11%
  const gross = basic + hra + da - pf;
  return { hra, da, pf, gross };
}

// DEBUG GET /api/employees - REPLACES OLD
async function listEmployees(req, res) {
  try {
    console.log('🔍 GET /api/employees called');
    console.log('📊 Models connected:', !!Employee);
    
    const employees = await Employee.find({});
    console.log('✅ Found employees:', employees.length);
    console.log('📋 First employee:', employees[0] ? employees[0].name : 'none');
    
    return res.json(employees);
  } catch (err) {
    console.error('❌ GET /api/employees ERROR:', err.message);
    return res.status(500).json({ message: err.message });
  }
}

// POST /api/employees (unchanged)
async function createEmployee(req, res) {
  try {
    const payload = { ...req.body };
    if (!payload.empId) {
      payload.empId = makeEmpId();
    }
    const parts = computeSalaryParts(payload.basicSalary);
    Object.assign(payload, parts);
    const emp = new Employee(payload);
    await emp.save();
    return res.status(201).json(emp);
  } catch (err) {
    console.error('POST /api/employees error', err);
    return res.status(500).json({
      message: err.message || 'Server error creating employee',
    });
  }
}

// PUT /api/employees/:id (unchanged)
async function updateEmployee(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  try {
    const payload = { ...req.body };
    if (payload.basicSalary != null) {
      const parts = computeSalaryParts(payload.basicSalary);
      Object.assign(payload, parts);
    }
    const updated = await Employee.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json(updated);
  } catch (err) {
    console.error('PUT /api/employees/:id error', err);
    return res.status(500).json({ message: 'Server error updating employee' });
  }
}

// DELETE /api/employees/:id (unchanged)
async function deleteEmployee(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  try {
    const doc = await Employee.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json(doc);
  } catch (err) {
    console.error('DELETE /api/employees/:id error', err);
    return res.status(500).json({ message: 'Server error deleting employee' });
  }
}

module.exports = {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
