const express = require('express');
const router = express.Router();
const controller = require('./ai.controller');

router.get('/suggestions', controller.getSuggestions);

module.exports = router;
