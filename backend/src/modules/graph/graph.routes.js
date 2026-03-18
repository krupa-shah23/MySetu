const express = require('express');
const router = express.Router();
const controller = require('./graph.controller');

router.get('/career', controller.getCareerGraph);

module.exports = router;
