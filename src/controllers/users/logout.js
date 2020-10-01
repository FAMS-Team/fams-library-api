const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const logout = (req, res) => {
    if (!req.token){
        res.status(403);
    }

    jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
        if (err){
            res.status(500).json({error : 'Could not validate token.'});
        }
        else{
            try{
                await db.query('DELETE FROM Session WHERE ID_Contact = $1', [data.id_contact]);
                res.status(200).send({message: 'Logout successful'});
            } catch(err){
                res.status(500).send({error: 'An error ocurred trying to log out'});
            }
        }
    });
    
}

module.exports = logout;