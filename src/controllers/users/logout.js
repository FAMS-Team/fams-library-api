const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const logout = async (req, res) => {
    const {token} = req.body;
    if(!token){
        return res.sendStatus(401);
    }
    try{
        await db.query('DELETE FROM Session WHERE RefreshToken = $1', [token]);
        res.status(200).send({message: 'Logout successful'});
    } catch(error){
        res.status(500).send({error: 'An error ocurred trying to log out'});
    }
    
}

module.exports = logout;