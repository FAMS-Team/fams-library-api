const express = require("express");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");
const readBookByID = require("../controllers/books/read");

// Routes
router.post("/books", createBook);
router.get("/books/:id", readBookByID);

module.exports = router;
