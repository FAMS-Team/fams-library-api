const express = require("express");
const router = express.Router();
const login = require('../controllers/users/login');
const readUser = require('../controllers/users/read');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader) {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      next();
    }
    else{
      res.sendStatus(403);
    }
}


router.post('/login', login);
router.post('/get', verifyToken, readUser);

module.exports = router;
    
    