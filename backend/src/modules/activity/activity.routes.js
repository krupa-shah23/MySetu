const express = require('express');
const router = express.Router();
const controller = require('./activity.controller');

router.get('/', controller.getActivities);

module.exports = router;
