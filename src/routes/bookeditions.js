const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();

// Controllers
const createBookEdition = require("../controllers/bookeditions/create");

// Routes
router.post("/bookeditions", verifyUser, createBookEdition);


module.exports = router;
