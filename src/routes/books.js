const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");
const { getBookByID, getBooks, getEditionBooksWithoutBookLink } = require("../controllers/books/read");
const deleteBookByID = require("../controllers/books/delete");
const updateBook = require("../controllers/books/update");

// Routes
router.post("/books", verifyUser, createBook);
router.patch("/books/:id",verifyUser, updateBook);
router.get("/books/:id", getBookByID);
router.get("/books", getBooks);
//router.get("/books/editions/:id",getEditionBooksWithoutBookLink);
router.delete("/books/:id", verifyUser, deleteBookByID);

module.exports = router;
