const express = require('express');
const router = express.Router();
const countries = require('../controllers/countries/read');

router.get('/countries', countries);

module.exports = router;