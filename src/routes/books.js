const express = require("express");
const router = express.Router();

// Controllers
const createBook = require("../controllers/books/create");
const readBookByID = require("../controllers/books/read");
const deleteBookByID = require("../controllers/books/delete")

// Routes
router.post("/create", createBook);
router.get("/:id", readBookByID);
<<<<<<< HEAD
<<<<<<< HEAD
router.delete("/:id", deleteBookByID);
=======
>>>>>>> f51472e8179c1c2b245519a40adbb49532f614d1
=======
>>>>>>> f51472e8179c1c2b245519a40adbb49532f614d1

module.exports = router;
