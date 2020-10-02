const express = require("express");
const router = express.Router();

// Controllers
const getPaymentMethods = require("../controllers/payments/read");

// Routes
router.get("/payments", getPaymentMethods);

module.exports = router;
