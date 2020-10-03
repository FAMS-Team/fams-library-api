const express = require("express");
const router = express.Router();

// Controllers
const getAuthors = require("../controllers/authors/read");
const createAuthor = require("../controllers/authors/create");
const authenticate = require("../controllers/users/verify");

// Routes
router.get("/authors", getAuthors);
router.post("/authors/create", authenticate, createAuthor);

module.exports = router;