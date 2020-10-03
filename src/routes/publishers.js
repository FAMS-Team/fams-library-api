const express = require('express');
const router = express.Router();

// Controllers
const getPublishers = require("../controllers/publishers/read");

// Routes
router.get("/publishers", getPublishers);

module.exports = router;