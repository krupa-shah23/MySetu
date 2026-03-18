require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
const credentialsRoutes = require('./modules/credentials/credentials.routes');
const consentRoutes = require('./modules/consent/consent.routes');
const timelineRoutes = require('./modules/timeline/timeline.routes');
const graphRoutes = require('./modules/graph/graph.routes');
const qrRoutes = require('./modules/qr/qr.routes');
const aiRoutes = require('./modules/ai/ai.routes');
const institutionRoutes = require('./modules/institution/institution.routes');
const activityRoutes = require('./modules/activity/activity.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/credentials', credentialsRoutes);
app.use('/api/consent', consentRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/graph', graphRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/institution', institutionRoutes);
app.use('/api/activity', activityRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

module.exports = app;
