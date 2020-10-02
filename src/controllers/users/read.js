const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');

const user = async (req, res)=>{
    try{
        res.status(200).send(req.user);
    } catch (error){
        res.status(500);
    }
}

module.exports = user;
