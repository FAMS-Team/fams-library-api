const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const login = async (req, res) => {
        
    try{
        let email = req.body.email;
        let password = req.body.password;

        if(!email || !password){
            res.status(200).send({err: 'Invalid fields.'});
        }

        const text = 'SELECT * FROM Contact WHERE Email = $1';
        const values = [email];
        const result = await db.query(text, values);
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err){
                res.status(500).send({error: 'Internal server error.'});
            }
            if (result){
                //res.status(200).send(user)
                userToken = jwt.sign(user, process.env.SECRET_KEY);
                res.status(200).send(userToken);
            }
            else{
                res.status(400).send({error: 'Wrong password.'});
            }
        });
    }
    catch (err) {
        res.status(500).json({error: err.stack});
    }
    
}

module.exports = login;

