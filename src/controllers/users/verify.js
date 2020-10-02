const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader){
        const token = authHeader.split(' ')[1];
        try{
            const user = jwt.verify(token, process.env.ACCESS_KEY);
            req.user = user;
            next();
        } catch(error){
            res.sendStatus(401);
        }
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = authenticateToken;