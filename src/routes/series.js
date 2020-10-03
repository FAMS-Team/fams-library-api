const express = require("express");
const router = express.Router();

// Controllers
const getSeries = require("../controllers/series/read");

// Routes
router.get("/series", getSeries);

module.exports = router;
