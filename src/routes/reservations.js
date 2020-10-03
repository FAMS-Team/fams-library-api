const express = require("express");
const verifyUser = require("../controllers/users/verify");
const router = express.Router();


//Controllers
const createReservation = require("../controllers/reservations/create");
const getReservations = require("../controllers/reservations/read");

//Routes
router.post("/reservations", verifyUser, createReservation);
router.get("/reservations", verifyUser, getReservations);

module.exports = router;
