const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('../../db/queries_user');
require("dotenv").config();

const register = async (req, res) => {

    const {token, name, lastname, email, phone, usertype} = req.body;
    let password = req.body.password;
    
    try{
        password = await bcrypt.hash(password, 8)
    } catch(err){
        return res.status(500).send(err);
    }
    
    let insertUserQuery = queries.insertUserNoPhone;
    let values = [name, lastname, email, password];
    
    if (!name || !lastname || !email || !password){
        return res.status(400).json({error : 'Insufficient details provided.'});
    }

    if(token){
        const user = jwt.verify(token, process.env.ACCESS_KEY);
        if (!phone && user.id_contacttype == 1 && usertype){
            values = [usertype, name, lastname, email, password];
            insertUserQuery = queries.insertAdminNoPhone;
        }
        if (phone && user.id_contacttype == 1 && usertype){
            values = [usertype, name, lastname, email, phone, password];
            insertUserQuery = queries.insertAdminPhone;
        }
        else{
            return res.sendStatus(403);
        }
    }
    else if(phone){
        values = [name, lastname, email, phone, password];
        insertUserQuery = queries.insertUserPhone;
    }
    
    try{
        const result = await db.query(insertUserQuery, values);
        res.status(400).send({message: "Registration successful."});
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = register;