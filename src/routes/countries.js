const express = require('express');
const router = express.Router();

// Controllers
const countries = require('../controllers/countries/read');

// Routes
router.get('/get', countries);

module.exports = router;