const express = require('express');
const router = express.Router();
const controller = require('./consent.controller');

router.get('/requests', controller.getRequests);
router.get('/active', controller.getActiveSessions);
router.post('/approve', controller.approveRequest);
router.post('/deny', controller.denyRequest);

module.exports = router;
