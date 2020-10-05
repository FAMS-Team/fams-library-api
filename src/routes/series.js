const express = require("express");
const router = express.Router();

// Controllers
const getSeries = require("../controllers/series/read");
const createSeries = require("../controllers/series/create");
const authorize = require("../controllers/users/verify");

// Routes
router.get("/series", getSeries);
router.post("/series", authorize, createSeries);

module.exports = router;
