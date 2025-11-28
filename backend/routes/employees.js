// backend/routes/employees.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

// list, create, update, delete
router.get('/', controller.listEmployees);        // GET /api/employees
router.post('/', controller.createEmployee);      // POST /api/employees
router.put('/:id', controller.updateEmployee);    // PUT /api/employees/:id
router.delete('/:id', controller.deleteEmployee); // DELETE /api/employees/:id

module.exports = router;
