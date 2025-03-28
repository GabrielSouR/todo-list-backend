// src/routes/index.js
const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes')); 

module.exports = router;
