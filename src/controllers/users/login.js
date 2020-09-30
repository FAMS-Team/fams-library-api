const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const login = async (req, res) => {
        
    try{
        console.log(req.body);
        
        let email = req.body.email;
        let password = req.body.password;

        const text = 'SELECT * FROM Contact WHERE Email = $1';
        const values = [email];
        const result = await db.query(text, values);
        const user = result.rows[0];
        console.log(user);
        console.log(user.password);
        if (bcrypt.compareSync(password, user.password)){
            //res.status(200).send(user)
            userToken = jwt.sign(user, process.env.SECRET_KEY);
            res.status(200).send(userToken);
        }
        else{
            res.status(500).send({error: 'Incorrect password'});
        }
    }
    catch (err) {
        res.status(500).json({error: err.stack});
    }
    
}

module.exports = login;

