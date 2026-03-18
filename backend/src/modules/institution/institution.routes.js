const express = require('express');
const router = express.Router();
const controller = require('./institution.controller');

router.get('/requests', controller.getRequests);
router.get('/received', controller.getReceived);
router.post('/request', controller.requestCredential);
router.post('/revoke', controller.revokeAccess);

module.exports = router;
