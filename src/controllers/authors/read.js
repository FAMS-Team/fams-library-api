const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_author');

const authors = async (req, res) => {
    try{
        const result = await db.query(queries.selectAllAuthors);
        return res.status(200).json(result.rows);
    } catch (error){
        return res.status(500).send(error);
    }   
}

module.exports = authors;