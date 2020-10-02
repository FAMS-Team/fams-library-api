const db = require('../../db/postgres');
const queries = require("../../db/queries_user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();


const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const result = await db.query(queries.getUserFromEmail, [email]);
        const user = result.rows[0];

        if (await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign(user, process.env.ACCESS_KEY, {expiresIn: '30m'});
            const refreshToken = jwt.sign(user, process.env.REFRESH_KEY);
            const session = await db.query(queries.getRefreshTokenFromContact, [user.id_contact]);
            if (session.rowCount > 0){
                await db.query(queries.updateRefreshToken, [refreshToken, user.id_contact]);
            }
            else{
                await db.query(queries.insertRefreshToken, [user.id_contact, refreshToken]);
            }
            res.status(200).send({accessToken, refreshToken});
        }
        else{
            res.status(400).send({error: 'Invalid username or password.'});
        }
    } catch(error){
        res.status(500).send({error: error.stack});
    }
}

module.exports = login;

