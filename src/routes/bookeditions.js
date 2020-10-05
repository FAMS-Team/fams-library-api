const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();

// Controllers
const createBookEdition = require("../controllers/bookeditions/create");
const updateBookEdition = require("../controllers/bookeditions/update");
const deleteBookEdition = require("../controllers/bookeditions/delete");

// Routes
router.post("/bookeditions", verifyUser, createBookEdition);
router.patch("/bookeditions/:id", verifyUser,updateBookEdition);
router.delete("/bookeditions/:id", verifyUser,deleteBookEdition);

module.exports = router;
