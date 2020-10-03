const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_author');

const createAuthor = async (req, res) => {
    const {name, lastname, date_birth, date_death, description, country} = req.body;
    const {user} = req;
    const author = req.params.id;

    if(!user){
        return res.status(401);
    }
    else if(user.id_contacttype !== 1){
        return res.status(401);
    }

    try{
        if(name){
            await db.query(queries.updateAuthorName, [name, author]);
        }
        if(country){
            await db.query(queries.updateAuthorCountry, [country, author]);
        }
        if(lastname){
            await db.query(queries.updateAuthorLastname, [lastname, author]);
        }
        if(date_birth){
            await db.query(queries.updateAuthorDateBirth, [date_birth, author]);
        }
        if(date_death){
            await db.query(queries.updateAuthorDateDeath, [date_death, author]);
        }
        if(description){
            await db.query(queries.updateAuthorDescription, [description, author]);
        }

        return res.status(200).send({message: 'Author updated successfuly.'});
        
    } catch (error){
        return res.status(500).send(error);
    }   
}

module.exports = createAuthor;