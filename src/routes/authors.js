const express = require("express");
const router = express.Router();

// Controllers
const getAuthors = require("../controllers/authors/read");
const createAuthor = require("../controllers/authors/create");
const updateAuthor = require('../controllers/authors/update');
const authenticate = require("../controllers/users/verify");

// Routes
router.get("/authors", getAuthors);
router.post("/authors", authenticate, createAuthor);
router.post("/authors/:id", authenticate, updateAuthor);

module.exports = router;