require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

module.exports = app;
