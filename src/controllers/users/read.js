const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();



const user = (req, res)=>{
    if (!req.token){
        res.status(403);
    }

    jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
        if (err){
            res.status(500).json({error : 'Could not validate token.', stack: err.stack});
        }
        else{
            const result = await db.query('SELECT * FROM Session WHERE ID_Contact = $1', [data.id_contact]);
            if (result.rowCount === 0){
                res.status(400).send({error: 'Not logged in'});
            }
            else{
                res.status(200).send(data);
            }
        }
    });
}

module.exports = user;