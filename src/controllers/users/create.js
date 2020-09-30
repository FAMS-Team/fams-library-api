const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const signup = async (req, res) => {
    if (!req.token){
        res.status(403);
    }

    let user = {};
    jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        if (err){
            res.status(500).json({error : 'Could not validate token.'});
        }
        else{
            user = data;
        }
    })

    if (!user.name || !user.lastname || !user.email || !user.password){
        res.status(500).json({error : 'Insufficient details provided.'});
    }

    try{
        const text = 'INSERT INTO Contact(ID_ContactType, Name, Last_Name, Email, Password) VALUES(2, $1, $2, $3, $4) RETURNING *';
        const values = [user.name, user.lastname, user.email, user.password];
        const result = await db.query(text, values);
        userToken = jwt.sign(result.rows[0], process.env.SECRET_KEY, {expiresIn: '1h'});
        res.status(400).send(userToken);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = signup;