const express = require('express');
const router = express.Router();

// Controllers
const getPublishers = require("../controllers/publishers/read");
const insertPublisher = require("../controllers/publishers/create");
const authenticate = require("../controllers/users/verify");

// Routes
router.get("/publishers", getPublishers);
router.post("/publishers/create", authenticate, insertPublisher)

module.exports = router;