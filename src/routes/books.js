const express = require("express");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");
const readBookByID = require("../controllers/books/read");
const deleteBookByID = require("../controllers/books/delete")

// Routes
<<<<<<< HEAD
router.post("/books", createBook);
router.get("/books/:id", readBookByID);
router.delete("/books/:id", deleteBookByID);
=======
router.post("/create", createBook);
router.get("/:id", readBookByID);
>>>>>>> 684d551c4cdf13fcbcfcf467e6f79709aa50edc5

module.exports = router;
