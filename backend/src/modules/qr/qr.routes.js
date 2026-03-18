const express = require('express');
const router = express.Router();
const controller = require('./qr.controller');

router.get('/payload', controller.getPayload);
router.post('/verify', controller.verifyQR);

module.exports = router;
