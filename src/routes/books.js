const express = require("express");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");
const { getBookByID, getBooks } = require("../controllers/books/read");

// Routes
router.post("/books", createBook);
router.get("/books/:id", getBookByID);
router.get("/books", getBooks);

module.exports = router;
