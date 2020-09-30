const db = require('../../db/postgres');

const countries = async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM Country ORDER BY Name');
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = countries;