const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();


//cControllers
const createReservation = require("../controllers/reservations/create");

//Routes
router.post("/reservations", verifyUser, createReservation);

module.exports = router;
