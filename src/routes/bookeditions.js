const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();

// Controllers
const createBookEdition = require("../controllers/bookeditions/create");
const updateBookEdition = require("../controllers/bookeditions/update");
const deleteBookEdition = require("../controllers/bookeditions/delete");

// Routes
router.post("/bookeditions", verifyUser, createBookEdition);
router.post("/bookedition/update", verifyUser,updateBookEdition);
router.delete("/bookedition/:id", verifyUser,deleteBookEdition);

module.exports = router;
