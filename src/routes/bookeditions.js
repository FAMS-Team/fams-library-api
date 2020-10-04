const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();

// Controllers
const createBookEdition = require("../controllers/bookeditions/create");
const updateBookEdition = require("../controllers/bookeditions/update");

// Routes
router.post("/bookeditions", verifyUser, createBookEdition);
router.post("/updatebe",updateBookEdition);

module.exports = router;
