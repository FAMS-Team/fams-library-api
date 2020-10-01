const express = require("express");
const router = express.Router();
const db = require('../db/postgres');
const login = require('../controllers/users/login');
const logout = require('../controllers/users/logout');
const getUser = require('../controllers/users/read');
const refreshToken = require('../controllers/users/token');
const authenticate = require('../controllers/users/verify');


router.post('/login', login);
router.post('/get', authenticate, getUser);
router.post('/logout', logout);
router.post('/token', refreshToken);

module.exports = router;
    
    