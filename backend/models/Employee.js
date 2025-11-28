// backend/models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },   // production|marketing|accounts
  designation: { type: String, required: true },  // je|se|asm|me|cs|ca
  basicSalary: { type: Number, required: true },

  // calculated fields (stored to keep authoritative values)
  hra: { type: Number, default: 0 },
  da: { type: Number, default: 0 },
  pf: { type: Number, default: 0 },
  gross: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
