const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();



const user = async (req, res)=>{
    if (!req.token){
        res.status(403);
    }
    else{
        try{
            const data = jwt.verify(req.token, process.env.SECRET_KEY);
            const result = await db.query('SELECT * FROM Session WHERE ID_Contact = $1 AND Token = $2', [data.id_contact, req.token]);
            if (result.rowCount === 0){
                res.status(403).send({error: 'Not logged in'});
            }
            else{
                res.status(200).send(data);
            }
        }catch(error){
            res.status(500).json({error : 'Could not validate token.'});
        }
    }
}

module.exports = user;