const express = require("express");
const router = express.Router();

// Controllers
const categories = require("../controllers/categories/read");

// Routes
router.get("/categories", categories);

module.exports = router;
