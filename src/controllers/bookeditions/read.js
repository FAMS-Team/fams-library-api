const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");

const getBookEditionByID = async (req, res) => {
  const id = req.params.id;

  try{
    const result = await db.query(queries.selectBookEdition,[id]);

    if(result.rows.length == 0){
      return res.status(404).send();
    }
    const book = result.rows[0];
    res.status(200).send(book);
  }catch(err) {
    res.status(500).send();
  }
};

module.exports = getBookEditionByID
