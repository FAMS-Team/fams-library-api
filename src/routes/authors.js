const express = require("express");
const router = express.Router();

// Controllers
const getAuthors = require("../controllers/authors/read");
const createAuthor = require("../controllers/authors/create");
const updateAuthor = require('../controllers/authors/update');
const deleteAuthor = require("../controllers/authors/delete");
const authenticate = require("../controllers/users/verify");

// Routes
router.get("/authors", getAuthors);
router.post("/authors", authenticate, createAuthor);
router.patch("/authors/:id", authenticate, updateAuthor);
router.delete("/authors/:id", authenticate, deleteAuthor);

module.exports = router;