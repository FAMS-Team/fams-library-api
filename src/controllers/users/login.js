const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { end } = require('../../db/postgres');
const e = require('express');
require("dotenv").config();

function validateFields(email, password){
    if(!email || !password){
        return false;
    }
}

const login = async (req, res, next) => {


        let email = req.body.email;
        let password = req.body.password;

        if(validateFields(email, password)){
            res.status(200).send({err: 'Invalid fields.'});
        }
        else{
            try{
                const result = await db.query('SELECT * FROM Contact WHERE Email = $1', [email]);
                const user = result.rows[0];

                
                if (!user){
                    res.status(400).send({error: 'Invalid username.'});
                    return;
                }
                else {
                    const session = await db.query('SELECT * FROM Session WHERE ID_Contact = $1', [user.id_contact]);
                    

                    if (session.rowCount > 0){
                        res.status(400).send({message: 'User already logged in.'});
                    }
                    else{
                        bcrypt.compare(password, user.password, (err, result) => {
                            if (err){
                                res.status(500).send({error: 'Internal server error.'});
                                return;
                            }
                            if (result){
                                //res.status(200).send(user)
                                const userToken = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1d'});
                                db.query('INSERT INTO Session (ID_Contact, Token) VALUES ($1, $2)', [user.id_contact, userToken]);
                                res.status(200).send(userToken);
                                return;
                            }
                            else{
                                res.status(400).send({error: 'Wrong password.'});
                                return;
                            }
                        });
                    }
                }
            }
            catch (err) {
                res.status(500).json({error: err.stack});
            }
        } 
}

module.exports = login;

