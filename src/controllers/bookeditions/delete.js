const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_bookedition");

const deleteBookEditionByID = async (req, res) => {
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
  try{
    const id = req.params.id;
    let result = await db.query(queries.deleteBookEditionByID,[id]);
    let publisherBookID;
    try{
      publisherBookID = await db.query(queries.selectBookPublisherByID,[result.rows[0].id_publisher_book]);
      if(!publisherBookID.rows[0]){
        await db.query(queries.deleteBookPublisherByID, [result.rows[0].id_publisher_book]);
      }
    }catch(err){
      console.log('Hay bookeditions existentes')
    }

    res.status(200).send("Success!");
  }catch(err){
    res.status(500).send(err);
  }
}
};

module.exports = deleteBookEditionByID
