const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_publisher');

const updatePublisher = async (req, res) => {
    const {name, country} = req.body;
    const {user} = req;
    const publisher = req.params.id;

    if(!user){
        return res.status(401);
    }
    else if(user.id_contacttype !== 1){
        return res.status(401);
    }
    /*
    if (!name || !country){
        return res.status(400).send({error: 'Insufficcient details provided.'});
    }
    */

   try{
       await db.query('BEGIN');
        if(name){
            await db.query(queries.updatePublisherName, [name, publisher]);
        }
        if(country){
            await db.query(queries.updatePublisherCountry, [country, publisher]);
        }
        //await db.query(queries.updatePublisher, [name, country, publisher]);
        await db.query('COMMIT');
        return res.status(200).send({message: 'Publisher updated successfuly.'});

    } catch (error){
        await db.query('ROLLBACK');
        return res.status(500).send(error);
    }   
}

module.exports = updatePublisher;