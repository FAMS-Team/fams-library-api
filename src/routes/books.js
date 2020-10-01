const express = require("express");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");
const readBookByID = require("../controllers/books/read");
const deleteBookByID = require("../controllers/books/delete")

// Routes
router.post("/create", createBook);
router.get("/:id", readBookByID);
router.delete("/:id", deleteBookByID);


module.exports = router;
