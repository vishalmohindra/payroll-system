// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount routes
app.use('/api/employees', require('./routes/employees'));

// Health check (useful for Render / uptime checks)
app.get('/', (req, res) => res.send('Payroll backend is running'));

// Generic error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
