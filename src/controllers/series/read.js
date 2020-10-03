const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_series');

const getSeries = async (req, res) => {
  try{
    const result = await db.query(queries.selectAllSeries);
    res.status(200).json(result.rows);
  } catch(err) {
    res.status(500).send(err);
  }
};

module.exports = getSeries;