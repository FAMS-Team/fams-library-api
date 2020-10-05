const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_author');

const updateAuthor = async (req, res) => {
    const {name, lastname, date_birth, date_death, description, country} = req.body;
    const {user} = req;
    const author = req.params.id;

    if(!user){
        return res.status(401);
    }
    else if(user.id_contacttype !== 1){
        return res.status(401);
    }
    /*
    if (!name || !country || !lastname || !date_birth || !date_death || !description){
        return res.status(400).send({error: 'Insufficcient details provided.'})
    }
    */
    if (name){
        await db.query(queries.updateAuthorName, [name, author]);
    }
    if (lastname){
        await db.query(queries.updateAuthorLastName, [lastname, author]);
    }
    if (date_birth){
        await db.query(queries.updateAuthorDateBirth, [date_birth, author]);
    }
    if (date_death){
        await db.query(queries.updateAuthorDateDeath, [date_death, author]);
    }
    if (description){
        await db.query(queries.updateAuthorDescription, [description, author]);
    }
    if (country){
        await db.query(queries.updateAuthorCountry, [country, author]);
    }
    try{
        await db.query(queries.updateAuthor, [name, lastname, date_birth, date_death, description, country, author]);
        return res.status(200).send({message: 'Author updated successfuly.'});
    } catch (error){
        return res.status(500).send(error);
    }   
}

module.exports = updateAuthor;