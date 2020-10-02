const express = require("express");
const router = express.Router();

// Controllers
const getCategories = require("../controllers/categories/read");

// Routes
router.get("/categories", getCategories);

module.exports = router;
