const express = require('express');
const router = express.Router();
const controller = require('./credentials.controller');

router.get('/', controller.getCredentials);

module.exports = router;
