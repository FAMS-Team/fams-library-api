const express = require("express");
const router = express.Router();

// Controllers
const login = require("../controllers/users/login");
const logout = require("../controllers/users/logout");
const getUser = require("../controllers/users/read");
const refreshToken = require("../controllers/users/token");
const register = require('../controllers/users/create');
const authenticate = require("../controllers/users/verify");

router.post("/users/login", login);
router.post("/users", register);
router.get("/users", authenticate, getUser);
router.post("/users/logout", logout);
router.post("/users/token", refreshToken);

module.exports = router;
