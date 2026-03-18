const express = require('express');
const router = express.Router();
const activityController = require('./activity.controller');

// GET /api/activity
router.get('/', activityController.getActivities);

module.exports = router;
