const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_publisher');

const createPublisher = async (req, res) => {
    const {name, country} = req.body;
    const {user} = req;
    if(!user){
        return res.status(401);
    }
    else if(user.id_contacttype !== 1){
        return res.status(401);
    }

    if (!name || !country){
        return res.status(400).send({error: 'Insufficcient details provided.'})
    }
    try{
        await db.query(queries.insertPublisher, [name, country]);
        return res.status(200).send({message: 'Publisher added successfuly.'});
    } catch (error){
        return res.status(500).send(error.stack);
    }   
}

module.exports = createPublisher;