const express = require('express');
const router = express.Router();

// Controllers
const getPublishers = require("../controllers/publishers/read");
const insertPublisher = require("../controllers/publishers/create");
const updatePublisher = require("../controllers/publishers/update");
const authenticate = require("../controllers/users/verify");

// Routes
router.get("/publishers", getPublishers);
router.post("/publishers", authenticate, insertPublisher)
router.post("/publishers/:id", authenticate, updatePublisher);

module.exports = router;