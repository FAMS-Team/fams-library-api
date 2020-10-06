const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();

// Controllers
const createBookEdition = require("../controllers/bookeditions/create");
const updateBookEdition = require("../controllers/bookeditions/update");
const deleteBookEdition = require("../controllers/bookeditions/delete");
const readBookEdition = require("../controllers/bookeditions/read")

// Routes
router.get("/books/editions/:id_edition",readBookEdition);
router.post("/books/:id_book/editions", verifyUser, createBookEdition);
router.patch("/books/editions/:id_edition", verifyUser,updateBookEdition);
router.delete("/books/editions/:id_edition", verifyUser,deleteBookEdition);

module.exports = router;
