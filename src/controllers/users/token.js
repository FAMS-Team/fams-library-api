const db = require('../../db/postgres');
const jwt = require('jsonwebtoken');

const generateToken = async (req, res) => {
    
    const {token} = req.body;
    console.log(token);
    if (!token){
        return res.sendStatus(401);
    }

    try{
        const result = await db.query('SELECT RefreshToken FROM Session WHERE RefreshToken = $1', [token]);
        if (!result){
            return res.sendStatus(403);
        }
        else{
            const user = jwt.verify(token, process.env.REFRESH_KEY);
            const accessToken = jwt.sign(user, process.env.ACCESS_KEY, {expiresIn: '30m'});
            res.status(200).send({accessToken});
        }
    } catch(error){
        res.sendStatus(500);
    }
}

module.exports = generateToken;