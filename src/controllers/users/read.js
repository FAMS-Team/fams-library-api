const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();



const user = (req, res)=>{
    if (!req.token){
        res.status(403);
    }

    jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        if (err){
            res.status(500).json({error : 'Could not validate token.'});
        }
        else{
            res.status(200).send(data);
        }
    })
}

module.exports = user;