const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

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

router.post('/login', verifyToken, (req, res) => {
    
    let user;
    
    //Authentication with DB
    
    //Generate token with user data
    jwt.sign({user : user}, process.env.SECRET_KEY, (err, token) => {
        res.json({
            token,
        });
    });
    
});


//Token verification
jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    
    if (err) res.sendStatus(403);
    
    user = authData;
});

module.exports = router;