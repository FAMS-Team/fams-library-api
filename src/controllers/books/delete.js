const db = require("../../db/postgres");
const queries = require("../../db/scripts/queries/queries_book")

const deleteBookByID = async (req, res) => {
  const type = req.user.id_contacttype;
  if(type !== 1){
    res.sendStatus(403);
  }
  else{
    const id = req.params.id;
    try {
      await db.query('BEGIN');

      await db.query(queries.deleteBookEdition, [id]);
      await db.query(queries.deletePublisherBook,[id]);
      await db.query(queries.deleteBookAuthor,[id]);
      await db.query(queries.deleteBook,[id]);

      await db.query('COMMIT');
      res.status(200).send({message: "Book deleted successfully."});
    } catch(err) {
      await db.query('ROLLBACK');
      res.status(500).send(err);
    }
  }
};

module.exports = deleteBookByID
