const express = require('express');
const router = express.Router();

// Controllers
const countries = require('../controllers/countries/read');

// Routes
router.get('/', countries);

module.exports = router;