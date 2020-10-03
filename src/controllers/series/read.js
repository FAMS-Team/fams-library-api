const db = require('../../db/postgres');
const queries = require('../../db/scripts/queries/queries_payment');

const getPaymentMethods = async (req, res) => {
  try{
    const result = await db.query(queries.selectAllPayments);
    res.status(200).json(result.rows);
  } catch(err) {
    res.status(500).send(err);
  }
};

module.exports = getPaymentMethods;