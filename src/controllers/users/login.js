const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();


const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const result = await db.query('SELECT * FROM Contact WHERE Email = $1', [email]);
        const user = result.rows[0];

        if (await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign(user, process.env.ACCESS_KEY, {expiresIn: '30m'});
            const refreshToken = jwt.sign(user, process.env.REFRESH_KEY);
            const session = await db.query('SELECT RefreshToken FROM Session WHERE ID_Contact = $1', [user.id_contact]);
            if (session.rowCount > 0){
                await db.query('UPDATE Session SET RefreshToken = $1 WHERE ID_Contact = $2', [refreshToken, user.id_contact]);
            }
            else{
                await db.query('INSERT INTO Session (ID_Contact, RefreshToken) VALUES ($1, $2)', [user.id_contact, refreshToken]);
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

