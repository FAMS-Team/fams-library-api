const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_series');

const createSeries = async (req, res) => {
    const {name, country} = req.body;
    const {user} = req;

    if(!user){
        return res.status(401);
    }
    else if(user.id_contacttype !== 1){
        return res.status(401);
    }

    if (!name){
        return res.status(400).send({error: 'Insufficcient details provided.'})
    }
    try{
        await db.query(queries.insertSeries, [name]);
        return res.status(200).send({message: 'Series added successfuly.'});
    } catch (error){
        return res.status(500).send(error.stack);
    }   
}

module.exports = createSeries;