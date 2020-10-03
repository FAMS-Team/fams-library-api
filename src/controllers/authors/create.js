const db = require('../../db/postgres');
const queries = require('../../db/queries_author');

const createAuthor = async (req, res) => {
    const {name, lastname, date_birth, date_death, description, country} = req.body;
    const {user} = req;

    if(!user){
        return res.status(401);
    }
    else if(user.id_contacttype !== 1){
        return res.status(401);
    }

    if (!name || !country || !lastname || !date_birth || !date_death || !description){
        return res.status(400).send({error: 'Insufficcient details provided.'})
    }
    try{
        await db.query(queries.insertAuthor, [name, lastname, date_birth, date_death, description, country]);
        return res.status(200).send({message: 'Author added successfuly.'});
    } catch (error){
        return res.status(500).send(error);
    }   
}

module.exports = createAuthor;