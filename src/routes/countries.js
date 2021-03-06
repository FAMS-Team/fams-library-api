const express = require("express");
const router = express.Router();

// Controllers
const getCountries = require("../controllers/countries/read");

// Routes
router.get("/countries", getCountries);

module.exports = router;
