const db = require('../../db/postgres');
const queries = require('../../db/queries');

const getCountries = async (req, res) => {
    try{
        const result = await db.query(queries.selectAllCountries);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = getCountries;
