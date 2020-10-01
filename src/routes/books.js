const express = require("express");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");

// Routes
router.post("/books", createBook);

module.exports = router;
