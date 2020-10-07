const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");

const deleteBookEditionByID = async (req, res) => {
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
  try{
    await db.query('BEGIN');
    const id = req.params.id_edition;
    let result = await db.query(queries.deleteBookEditionByID,[id]);
    let publisherBookID;

    publisherBookID = await db.query(queries.selectBookPublisherByID,[result.rows[0].id_publisher_book]);
    if(!publisherBookID.rows[0]){
      await db.query(queries.deleteBookPublisherByID, [result.rows[0].id_publisher_book]);
    }

    await db.query('COMMIT')

    res.status(200).send({message: "Successfully deleted edition!"});
  }catch(err){
    await db.query('ROLLBACK');
    res.status(500).send(err);
  }
}
};

module.exports = deleteBookEditionByID
