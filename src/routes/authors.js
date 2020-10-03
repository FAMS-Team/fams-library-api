const express = require("express");
const router = express.Router();

// Controllers
const getAuthors = require("../controllers/authors/read");

// Routes
router.get("/authors", getAuthors);

module.exports = router;