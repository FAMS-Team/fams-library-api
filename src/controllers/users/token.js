const db = require('../../db/postgres');
const queries = require("../../db/queries_user");
const jwt = require('jsonwebtoken');

const generateToken = async (req, res) => {
    
    const {token} = req.body;
    if (!token){
        return res.sendStatus(401);
    }

    try{
        const result = await db.query(queries.getRefreshTokenFromToken, [token]);
        if (!result){
            return res.sendStatus(403);
        }
        else{
            jwt.verify(token, process.env.REFRESH_KEY, (error, user) => {
                if (error){
                    return res.sendStatus(403);
                }
                const {id_contact, id_contacttype, name, last_name, date_register, phone, email, password} = user;
                const accessToken = jwt.sign({id_contact, id_contacttype, name, last_name, date_register, phone, email, password}, process.env.ACCESS_KEY, {expiresIn: '30m'});
                res.status(200).send({accessToken});
            });
        }
    } catch(error){
        res.sendStatus(500);
    }
}

module.exports = generateToken;