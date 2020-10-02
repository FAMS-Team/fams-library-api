const express = require('express');
const router = express.Router();

//Controllers
const categories = require('../controllers/categories/read');

// Routes
router.get('/get', categories);

module.exports = router;