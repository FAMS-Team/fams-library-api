const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const logout = async (req, res) => {
    if (!req.token){
        res.status(403);
    }
    try{
        const data = jwt.verify(req.token, process.env.SECRET_KEY);
        await db.query('DELETE FROM Session WHERE ID_Contact = $1', [data.id_contact]);
        res.status(200).send({message: 'Logout successful'});
    } catch(error){
        res.status(500).send({error: 'An error ocurred trying to log out'});
    }
    
}

module.exports = logout;